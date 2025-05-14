<template>
  <div class="table-container" :class="`table-container--${theme}`">
    <table>
      <thead class="sticky-header" :class="`sticky-header--${theme}`">
        <tr>
          <th 
            class="sticky-header__title" 
            :class="`sticky-header__title--${theme}`"
            @click="$emit('sort', 'id')">
              ID
          </th>
          <th 
            class="sticky-header__title" 
            :class="`sticky-header__title--${theme}`"
            @click="$emit('sort', 'albumId')">
              Альбом
          </th>
          <th 
            class="sticky-header__title"
            :class="`sticky-header__title--${theme}`"
            @click="$emit('sort', 'title')">
            Название
          </th>
          <th 
            class="sticky-header__title"
            :class="`sticky-header__title--${theme}`"
            @click="$emit('sort', 'url')">
            Ссылка
          </th>
          <th
            class="sticky-header__title"
            :class="`sticky-header__title--${theme}`"
            @click="$emit('sort', 'thumbnailUrl')">
            Миниатюра
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in photos" :key="photo.id">
          <td :title="photo.id">{{ photo.id }}</td>
          <td :title="photo.albumId">{{ photo.albumId }}</td>
          <td :title="photo.title" class="truncate">{{ photo.title }}</td>
          <td :title="photo.url" class="truncate">
            <a :href="photo.url" target="_blank">Ссылка</a>
          </td>
          <td :title="photo.thumbnailUrl">
            <img :src="photo.thumbnailUrl" width="50" height="50" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import type { Photo } from '@/types/photo';

  const props = defineProps({
    photos: {
      type: Array as PropType<Photo[]>,
      required: true
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
      validator: (value: string) => ['light', 'dark'].includes(value)
    }
  });

  defineEmits<{
    (event: 'sort', field: keyof Photo): void;
  }>();
</script>

<style scoped>
.table-container {
  max-height: 600px;
  overflow-y: auto;
  margin-bottom: 50px;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.3s ease;
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
  color: var(var(--content-primary));
}

.table-container--light a {
  color: #1a73e8;
}

.table-container--dark a {
  color: #8ab4f8;
}
</style>