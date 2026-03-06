import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../shared/ui/button/button';
import { Video } from '../../../../services/api.service';

@Component({
  selector: 'app-video-list',
  imports: [CommonModule],
  templateUrl: './video-list.html',
  styleUrl: './video-list.css',
})
export class VideoList {
  @Input() videos: Video[] = [];
  @Input() isUploading: boolean = false;
  @Input() uploadProgress: number = 0;
  @Output() upload = new EventEmitter<File>();
  @Output() delete = new EventEmitter<string>();

  // UI Error state
  uploadError: string | null = null;

  // Match backend limits
  private readonly MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB
  private readonly ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

  onFileSelected(event: any) {
    this.uploadError = null; // Reset previous errors
    const file = event.target.files[0];

    if (file) {
      // 1. Validate File Type
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        this.uploadError = `Định dạng không hỗ trợ (${file.type || 'Unknown'}). Vui lòng chọn MP4, WebM, OGG hoặc MOV.`;
        event.target.value = ''; // Reset input
        return;
      }

      // 2. Validate File Size
      if (file.size > this.MAX_FILE_SIZE) {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        this.uploadError = `File quá lớn (${sizeInMB} MB). Giới hạn tối đa là 500 MB.`;
        event.target.value = ''; // Reset input
        return;
      }

      // If validations pass, emit the file to the parent component for uploading
      this.upload.emit(file);

      // Reset input so the same file can be selected again if needed
      event.target.value = '';
    }
  }
}