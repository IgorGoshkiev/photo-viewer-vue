<template>
  <div id="app" :class="themeStore.theme">
    <div class="content-wrapper">
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useThemeStore } from '@/stores/themeStore';
  const themeStore = useThemeStore();
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
</script>

<style>
/* Глобальные стили */
  #app {
    min-height: 100vh;
    transition: background 0.3s ease;
  }

  #app.light {
    background: linear-gradient(180deg, #f0f0f0 0%, #dcdcdc 100%);
  }

  #app.dark {
    background: linear-gradient(180deg, #000 0%, #272424 100%);
  }
</style>

<style scoped>
  /* Стили контента*/
  .content-wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 10px;
    min-height: 100vh;
  }

  @media (max-width: 767px) {
    .content-wrapper {
      max-width: 375px;
      padding: 0 5px;
    }
  }
</style>