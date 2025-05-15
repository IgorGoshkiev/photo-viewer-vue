import { defineStore } from 'pinia';
import { fetchPhotos } from '@/api/albumApi';
import type { Photo } from '@/types/photo';

export const usePhotosStore = defineStore('photos', {
  state: () => ({
    allPhotos: [] as Photo[],
    visiblePhotos: [] as Photo[],
    isLoading: false,
    error: null as string | null,
    selectedAlbums: JSON.parse(localStorage.getItem('selectedAlbums') || '[]') as string[],
    sortBy: localStorage.getItem('sortBy') || 'id',
    sortDirection: localStorage.getItem('sortDirection') || 'asc',
    visibleCount: 30
  }),

  actions: {
    async loadPhotos() {
      this.isLoading = true;
      this.error = null;
      try {
        this.allPhotos = await fetchPhotos(this.selectedAlbums);
        this.applySort();
        this.visibleCount = 30; // Сброс при новой загрузке
        this.updateVisiblePhotos();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки фото';
        console.error('Ошибка загрузки:', error);
      } finally {
        this.isLoading = false;
      }
    },

    loadMore() {
      if (this.visibleCount >= this.allPhotos.length) return;
      this.visibleCount += 30;
      this.updateVisiblePhotos();
    },

    updateVisiblePhotos() {
      this.visiblePhotos = this.allPhotos.slice(0, this.visibleCount);
    },

    applySort() {
      this.allPhotos.sort((a, b) => {
        const valA = a[this.sortBy as keyof Photo];
        const valB = b[this.sortBy as keyof Photo];
        return this.sortDirection === 'asc' 
          ? valA > valB ? 1 : -1 
          : valA < valB ? 1 : -1;
      });
      this.updateVisiblePhotos();
    },

    sortPhotos(field: keyof Photo) {
      if (this.sortBy === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = field;
        this.sortDirection = 'asc';
      }
      localStorage.setItem('sortBy', this.sortBy);
      localStorage.setItem('sortDirection', this.sortDirection);
      this.applySort();
    },

    setSelectedAlbums(albums: string[]) {
      this.selectedAlbums = albums.filter(id => id.trim() && !isNaN(Number(id)));
      localStorage.setItem('selectedAlbums', JSON.stringify(this.selectedAlbums));
      this.loadPhotos();
    }
  }
});