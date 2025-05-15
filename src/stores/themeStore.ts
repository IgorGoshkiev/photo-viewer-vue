import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
  };

  // Применяем тему при загрузке
  watch(() => theme.value, (newTheme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, { immediate: true });

  return { theme, toggleTheme };
});