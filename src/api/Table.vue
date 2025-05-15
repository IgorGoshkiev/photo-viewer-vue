<template>
  <div class="table-wrapper">
    <div 
      class="table-container"
      :class="`table-container--${themeStore.theme}`"
      ref="tableContainer"
      @scroll="handleScroll"
    >
      <table>
        <thead class="sticky-header" :class="`sticky-header--${themeStore.theme}`">
          <tr>
            <th 
              v-for="column in columns"
              :key="column.key"
              :class="`sticky-header__title sticky-header__title--${themeStore.theme}`"
              @click="photosStore.sortPhotos(column.key)"
            >
              {{ column.label }}
              <span v-if="photosStore.sortBy === column.key">
                {{ photosStore.sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="photo in photosStore.visiblePhotos" 
            :key="photo.id"
            :class="`table-row--${theme}`"
          >
            <td :title="photo.id">{{ photo.id }}</td>
            <td :title="photo.albumId">{{ photo.albumId }}</td>
            <td class="truncate" :title="photo.title">{{ photo.title }}</td>
            <td class="truncate">
              <a :href="photo.url" target="_blank" :class="`link--${themeStore.theme}`">Ссылка</a>
            </td>
            <td>
              <img :src="photo.thumbnailUrl" width="50" height="50" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- блок для спиннера -->
      <div 
        v-if="photosStore.isLoading"
        class="loading-overlay"
        :class="`loading-overlay--${themeStore.theme}`"
      >
        <div class="loading-spinner"></div>
        <div class="loading-text">Загрузка...</div>
      </div>
    </div>
      <div v-if="photosStore.error" class="error-message">
      Ошибка загрузки: {{ photosStore.error }}
      <button @click="photosStore.loadPhotos()">Повторить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { usePhotosStore } from '@/stores/photosStore';
  import { useThemeStore } from '@/stores/themeStore';
  import type { Photo } from '@/types/photo';

  const photosStore = usePhotosStore();
  const themeStore = useThemeStore();
  const tableContainer = ref<HTMLDivElement | null>(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'albumId', label: 'Альбом' },
    { key: 'title', label: 'Название' },
    { key: 'url', label: 'Ссылка' },
    { key: 'thumbnailUrl', label: 'Миниатюра' }
  ];

  const handleScroll = () => {
    if (!tableContainer.value) return;
    const { scrollTop, scrollHeight, clientHeight } = tableContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !photosStore.isLoading) {
      photosStore.loadMore();
    }
  };

  onMounted(() => {
    photosStore.loadPhotos();
  });
</script>

<style scoped>
  .table-wrapper {
    position: relative;
  }

  .table-container {
    max-height: 600px;
    overflow-y: auto;
    margin: 0 auto 50px;
    border-radius: 8px;
    padding: 10px;
    transition: all 0.3s ease;
    position: relative;
  }

  .table-container--light {
    border: 1px solid var(--content-active);
    background-color: var(--background-white);
  }

  .table-container--dark {
    border: 1px solid var(--lightinputbackground);
    background-color: var(--background-black);
  }

  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    transition: all 0.3s ease;
  }

  .sticky-header--light {
    background-color: var(--content-primary);
  }

  .sticky-header--dark {
    background-color: var(--background-secondary);
  }

  .sticky-header__title {
    padding: 12px;
    text-align: left;
    transition: all 0.3s ease;
  }

  .sticky-header__title--light {
    color: #333;
    background-color: var(--background-white);
    border-bottom: 1px solid #e0e0e0;
  }

  .sticky-header__title--dark {
    color: var(--content-primary);
    background-color: #2d2d2d;
    border-bottom: 1px solid #444;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  /* Стили для строк таблицы */
  .table-container--light tr {
    border-bottom: 1px solid #e0e0e0;
  }

  .table-container--dark tr {
    border-bottom: 1px solid var(--background-secondary);
  }

  .table-container--light tr:hover {
    background-color: var(--content-active);
  }

  .table-container--dark tr:hover {
    background-color: #333;
  }

  /* Стили для текста */
  .table-container--light {
    color: #333;
  }

  .table-container--dark {
    color: var(--content-primary);
  }

  .table-container--light a {
    color: #1a73e8;
  }

  .table-container--dark a {
    color: #8ab4f8;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(2px);
    z-index: 20;
    border-radius: 8px;
  }

  .loading-overlay--dark {
    background: rgba(30, 30, 30, 0.7);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: var(--content-active);
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
  }

  .loading-text {
    font-size: 16px;
    color: inherit;
  }

  .error-message {
    padding: 16px;
    background: #ffebee;
    color: #c62828;
    border-radius: 4px;
    margin-top: 16px;
    text-align: center;
  }

  .error-message button {
    margin-left: 8px;
    padding: 4px 8px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .table-container--dark .link--dark {
    color: #8ab4f8;
  }

  .table-row--dark:hover {
    background-color: #333;
  }
</style>