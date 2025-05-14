<template>
  <div class="input-container" :class="`input-container--${theme}`">
    <input
      ref="inputRef"
      class="input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @keyup.enter="$emit('search')"
    />
    <span v-if="error" class="input__error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Введите ID альбомов через пробел'
    },
    modelValue: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: 'Ошибка'
    },
    theme: {
      type: String as () => 'light' | 'dark',
      default: 'light'
    }
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'search'): void
  }>();

  const inputRef = ref<HTMLInputElement | null>(null);

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };

  defineExpose({
    focus: () => inputRef.value?.focus()
  });
</script>

<style scoped>
  .input-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .input {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  /* Светлая тема */
  .input-container--light .input {
    border: 1px solid #e0e0e0;
    background-color: var(--background-white);
    color: #333;
  }

  .input-container--light .input:focus {
    border-color: var(--content-active);
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
  }

  /* Темная тема */
  .input-container--dark .input {
    border: 1px solid #444;
    background-color: #2d2d2d;
    color: var(--content-primary);
  }

  .input-container--dark .input:focus {
    border-color: #8ab4f8;
    box-shadow: 0 0 0 2px rgba(138, 180, 248, 0.2);
  }

  .input-container--dark .input::placeholder {
    color: #aaa;
  }

  .input__error-message {
    color: #ff4444;
    font-size: 12px;
    padding-left: 8px;
  }
</style>