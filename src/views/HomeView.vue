<template>
  <Table />
</template>

<script setup lang="ts">
  import { useThemeStore } from '@/stores/themeStore';
  import Table from '@/components/Table.vue';

  const themeStore = useThemeStore();
</script>

<style scoped>

</style>
