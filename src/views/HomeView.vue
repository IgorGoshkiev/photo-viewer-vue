<template>
  <div class="home" :class="themeStore.theme">
    <Table 
      :photos="photosStore.photos" 
      :theme="themeStore.theme"
      @sort="photosStore.sortPhotos" 
    />
    <div v-if="photosStore.isLoading" class="skeleton">Загрузка...</div>
  </div>
</template>

<script setup>
import { usePhotosStore } from '@/stores/photosStore';
import { useThemeStore } from '@/stores/themeStore';
import Table from '@/components/Table.vue';

const photosStore = usePhotosStore();
const themeStore = useThemeStore();
</script>

<style scoped>
.home {
  transition: background 0.3s, color 0.3s;
}

.home.light {
  color: var(--content-black);
}

.home.dark {
  color: var(--content-primary);
}

.skeleton {
  padding: 20px;
  text-align: center;
  color: inherit;
}
</style>