import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../../shared/ui/button/button';
import { Video, Profile, ApiService } from '../../../../services/api.service';
import { ConfirmModal } from '../../../../shared/ui/confirm-modal/confirm-modal';
import { slugify } from '../../../../shared/utils/slugify';

@Component({
  selector: 'app-profile-manager',
  imports: [CommonModule, FormsModule, ConfirmModal],
  templateUrl: './profile-manager.html',
  styleUrl: './profile-manager.css',
})
export class ProfileManager {
  @Input() profiles: Profile[] = [];
  @Input() videos: Video[] = [];

  // New/Edit Profile State
  isEditing = false;
  editingId: string | null = null;
  profileName = '';
  mobileTab: 'library' | 'playlist' = 'library';

  // Modal State
  videoDeletingId = null; // Unused here? Wait, ProfileManager manages Profiles. We need profile deleting state.
  deletingProfileId: string | null = null;

  // Ordered Playlist
  playlistVideos: Video[] = [];

  // Drag State
  draggedIndex: number | null = null;
  draggedVideo: Video | null = null;
  isDragOverPlaylist = false;

  constructor(private api: ApiService) { }

  openCreate() {
    this.isEditing = true;
    this.editingId = null;
    this.profileName = '';
    this.playlistVideos = [];
  }

  openEdit(profile: Profile) {
    this.isEditing = true;
    this.editingId = profile.id;
    this.profileName = profile.name;

    // Map IDs back to Video objects, preserving order
    this.playlistVideos = profile.videoIds
      .map(id => this.videos.find(v => v.id === id))
      .filter((v): v is Video => !!v);
  }

  @Output() refresh = new EventEmitter<void>();

  addToPlaylist(video: Video) {
    this.playlistVideos.push(video);
  }

  removeFromPlaylist(index: number) {
    this.playlistVideos.splice(index, 1);
  }

  // Drag & Drop Handlers
  onDragStartFromLibrary(event: DragEvent, video: Video) {
    this.draggedVideo = video;
    this.draggedIndex = null;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('text/plain', 'library'); // Marker for library drag
    }
  }

  onDragStart(event: DragEvent, index: number) {
    this.draggedIndex = index;
    this.draggedVideo = null;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index.toString());
    }
  }

  onDragOver(event: DragEvent, index?: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = this.draggedVideo ? 'copy' : 'move';
    }
    this.isDragOverPlaylist = true;
  }

  onDragLeave() {
    this.isDragOverPlaylist = false;
  }

  onDrop(event: DragEvent, index?: number) {
    event.preventDefault();
    this.isDragOverPlaylist = false;

    // 1. Dragging from Library
    if (this.draggedVideo) {
      const targetIndex = index !== undefined ? index : this.playlistVideos.length;
      this.playlistVideos.splice(targetIndex, 0, this.draggedVideo);
      this.draggedVideo = null;
    }
    // 2. Reordering within Playlist
    else if (this.draggedIndex !== null) {
      const targetIndex = index !== undefined ? index : this.playlistVideos.length - 1;
      const movedItem = this.playlistVideos[this.draggedIndex];
      this.playlistVideos.splice(this.draggedIndex, 1);
      this.playlistVideos.splice(targetIndex, 0, movedItem);
      this.draggedIndex = null;
    }
  }

  save() {
    const name = this.profileName.trim();
    if (!name) return;

    const videoIds = this.playlistVideos.map(v => v.id);

    const obs = this.editingId
      ? this.api.updateProfile(this.editingId, name, videoIds)
      : this.api.createProfile(name, videoIds);

    obs.subscribe(() => {
      this.isEditing = false;
      this.refresh.emit();
    });
  }

  cancel() {
    this.isEditing = false;
  }

  deleteProfile(id: string) {
    this.deletingProfileId = id;
  }

  confirmDelete() {
    if (this.deletingProfileId) {
      this.api.deleteProfile(this.deletingProfileId).subscribe(() => {
        this.refresh.emit();
        this.deletingProfileId = null;
      });
    }
  }

  cancelDelete() {
    this.deletingProfileId = null;
  }

  getPlayerUrl(name: string): string {
    return `${window.location.origin}/player/${slugify(name)}`;
  }

  isOnline(lastSeen?: string): boolean {
    if (!lastSeen) return false;
    const diff = Date.now() - new Date(lastSeen).getTime();
    return diff < 60000; // Online if seen in last 60s
  }
}
