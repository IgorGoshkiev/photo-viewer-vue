import { defineStore } from 'pinia';
import { fetchPhotos } from '@/api/albumApi';
import type { Photo } from '@/types/photo';

export const usePhotosStore = defineStore('photos', {
  state: () => ({
    photos: [] as Photo[],
    isLoading: false,
    error: null as string | null,
    selectedAlbums: JSON.parse(localStorage.getItem('selectedAlbums') || '[]') as string[],
    sortBy: 'id' as 'id' | 'albumId' | 'title' | 'url' | 'thumbnailUrl', // Указываем конкретные поля
    sortDirection: 'asc' as 'asc' | 'desc' // Фиксируем возможные значения
  }),

  actions: {
    async loadPhotos() {
      this.isLoading = true;
      this.error = null;
      try {
        this.photos = await fetchPhotos(this.selectedAlbums);
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Не удалось загрузить фото';
      } finally {
        this.isLoading = false;
      }
    },

    setSelectedAlbums(albums: string[]) {
      this.selectedAlbums = albums;
      localStorage.setItem('selectedAlbums', JSON.stringify(albums));
      this.loadPhotos();
    },

    sortPhotos(field: keyof Photo) { // Используем keyof Photo для безопасности типов
      if (this.sortBy === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = field;
        this.sortDirection = 'asc';
      }

      this.photos.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        return this.sortDirection === 'asc' 
          ? valA > valB ? 1 : -1 
          : valA < valB ? 1 : -1;
      });
    }
  }
});