import fs from 'fs-extra';
import path from 'node:path';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import ffmpegPath from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { getConfig } from '../config';
import { dbRepository } from '../db';
import { logError, logInfo } from '../logger';
import type { Video } from '../types';

const config = getConfig();
const execFileAsync = promisify(execFile);
const queue: string[] = [];
let isProcessing = false;

interface FfprobeStream {
    codec_type?: string;
    height?: number;
    width?: number;
}

interface FfprobeOutput {
    format?: {
        duration?: string;
    };
    streams?: FfprobeStream[];
}

const getRequiredBinary = (binaryPath: string | null | undefined, toolName: string) => {
    if (!binaryPath) {
        throw new Error(`${toolName} binary is not available.`);
    }

    return binaryPath;
};

const probe = async (inputPath: string): Promise<Partial<Video>> => {
    const ffprobePath = getRequiredBinary(ffprobeStatic.path, 'ffprobe');
    const { stdout } = await execFileAsync(ffprobePath, [
        '-v',
        'error',
        '-print_format',
        'json',
        '-show_format',
        '-show_streams',
        inputPath,
    ]);

    const metadata = JSON.parse(stdout) as FfprobeOutput;
    const videoStream = metadata.streams?.find((stream) => stream.codec_type === 'video');
    const duration = metadata.format?.duration ? Number(metadata.format.duration) : undefined;

    return {
        durationSeconds: Number.isFinite(duration) ? duration : undefined,
        height: videoStream?.height,
        width: videoStream?.width,
    };
};

const transcodeToOptimizedMp4 = async (sourcePath: string, outputPath: string) => {
    const ffmpegBinary = getRequiredBinary(ffmpegPath, 'ffmpeg');

    await new Promise<void>((resolve, reject) => {
        const process = spawn(ffmpegBinary, [
            '-y',
            '-i',
            sourcePath,
            '-movflags',
            '+faststart',
            '-preset',
            'veryfast',
            '-crf',
            '24',
            '-maxrate',
            '3500k',
            '-bufsize',
            '7000k',
            '-vf',
            'scale=w=1920:h=1080:force_original_aspect_ratio=decrease',
            '-pix_fmt',
            'yuv420p',
            '-profile:v',
            'high',
            '-level',
            '4.1',
            '-c:v',
            'libx264',
            '-c:a',
            'aac',
            '-b:a',
            '128k',
            '-f',
            'mp4',
            outputPath,
        ]);

        let stderr = '';

        process.stderr.on('data', (chunk: Buffer | string) => {
            stderr += chunk.toString();
        });

        process.on('error', reject);
        process.on('close', (code) => {
            if (code === 0) {
                resolve();
                return;
            }

            reject(new Error(stderr.trim() || `ffmpeg exited with code ${code}`));
        });
    });
};

const ensureUniqueProcessedPath = (videoId: string) =>
    path.join(config.processedUploadsDir, `${videoId}-optimized.mp4`);

const processNext = async () => {
    if (isProcessing || !queue.length) {
        return;
    }

    isProcessing = true;
    const videoId = queue.shift() as string;

    try {
        const video = await dbRepository.findVideoById(videoId);
        if (!video) {
            return;
        }

        await dbRepository.updateVideo(videoId, (draft) => {
            draft.processingStatus = 'processing';
            draft.processingError = undefined;
        });

        const sourcePath = path.join(config.uploadsDir, video.sourceFilename);
        const optimizedFilename = path.basename(ensureUniqueProcessedPath(video.id));
        const optimizedPath = path.join(config.processedUploadsDir, optimizedFilename);

        await transcodeToOptimizedMp4(sourcePath, optimizedPath);

        const [sourceStats, optimizedStats, mediaMetadata] = await Promise.all([
            fs.stat(sourcePath),
            fs.stat(optimizedPath),
            probe(optimizedPath),
        ]);

        if (optimizedStats.size >= sourceStats.size) {
            await fs.remove(optimizedPath);
            await dbRepository.updateVideo(videoId, (draft) => {
                draft.processingStatus = 'ready';
                draft.processingError = 'Giữ lại bản gốc vì file tối ưu không nhỏ hơn.';
                draft.streamVariant = 'original';
                draft.durationSeconds = mediaMetadata.durationSeconds || draft.durationSeconds;
                draft.height = mediaMetadata.height || draft.height;
                draft.width = mediaMetadata.width || draft.width;
            });
        } else {
            await dbRepository.updateVideo(videoId, (draft) => {
                draft.filename = path.join('processed', optimizedFilename);
                draft.mimeType = 'video/mp4';
                draft.processingStatus = 'ready';
                draft.processingError = undefined;
                draft.size = optimizedStats.size;
                draft.streamVariant = 'optimized';
                draft.durationSeconds = mediaMetadata.durationSeconds;
                draft.height = mediaMetadata.height;
                draft.width = mediaMetadata.width;
            });
        }

        logInfo('media.optimized', { videoId });
    } catch (error) {
        logError('media.optimize_failed', {
            error: error instanceof Error ? error.message : String(error),
            videoId,
        });
        await dbRepository.updateVideo(videoId, (draft) => {
            draft.processingStatus = 'ready';
            draft.processingError = 'Không thể tối ưu hóa video, đang dùng bản gốc.';
            draft.streamVariant = 'original';
        });
    } finally {
        isProcessing = false;
        if (queue.length) {
            void processNext();
        }
    }
};

export const enqueueVideoOptimization = async (videoId: string) => {
    if (!config.mediaProcessingEnabled) {
        return;
    }

    const video = await dbRepository.findVideoById(videoId);
    if (!video) {
        return;
    }

    try {
        const sourcePath = path.join(config.uploadsDir, video.sourceFilename);
        const sourceMetadata = await probe(sourcePath);
        await dbRepository.updateVideo(videoId, (draft) => {
            draft.durationSeconds = sourceMetadata.durationSeconds;
            draft.height = sourceMetadata.height;
            draft.width = sourceMetadata.width;
        });
    } catch (error) {
        logError('media.probe_failed', {
            error: error instanceof Error ? error.message : String(error),
            videoId,
        });
    }

    queue.push(videoId);
    await processNext();
};
