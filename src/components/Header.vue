<template>
  <header class="header">
    <Logo :theme="themeStore.theme" clickable to="/" />

     <Button 
      :theme="themeStore.theme"
      variant="icon" 
      :icon="themeStore.theme === 'light' ? 'moon' : 'sun'"
      @click="themeStore.toggleTheme"
    />
    
    <div class="search-container">
      <Input
        v-model="searchQuery"
        :theme="themeStore.theme"
        placeholder="Введите ID альбомов через пробел"
        @search="handleSearch"
      />
      <Button 
        :theme="themeStore.theme"
        variant="primary"
        label="Поиск"
        :disabled="photosStore.isLoading"
        @click="handleSearch"
      />
    </div>
    
  </header>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { usePhotosStore } from '@/stores/photosStore';
  import { useThemeStore } from '@/stores/themeStore';
  import Logo from '@/components/Logo.vue';
  import Button  from '@/components/Button.vue';
  import Input from '@/components/InputSearch.vue';

  const photosStore = usePhotosStore();
  const themeStore = useThemeStore();
  const searchQuery = ref('');

  onMounted(() => {
    searchQuery.value = ''; // сбрасываем значение input
  });

  watch(() => photosStore.selectedAlbums, (newAlbums) => {
    searchQuery.value = newAlbums.join(' ');
  }, { immediate: true });

  const handleSearch = () => {
    photosStore.setSelectedAlbums(searchQuery.value.split(' '));
  };
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap;
}

.search-container {
 display: flex;
  gap: 12px;
  flex-grow: 1;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
  }
  
  .search-container {
    width: 100%;
  }
}
</style>