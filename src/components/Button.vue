<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${theme}`,
      { 'button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="label" class="button-label">{{ label }}</span>
    <img 
      v-if="icon" 
      :src="iconPath" 
      :alt="label || 'icon'"
      class="button-icon"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, icon
    validator: (value: string) => ['primary', 'secondary', 'icon'].includes(value)
  },
  theme: {
    type: String,
    default: 'light', // light, dark
    validator: (value: string) => ['light', 'dark'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const iconPath = computed(() => {
  if (!props.icon) return '';
  try {
    return new URL(`../assets/icons/${props.icon}.svg`, import.meta.url).href;
  } catch {
    console.error(`Icon ${props.icon} not found`);
    return '';
  }
});
</script>

<style scoped>
.button {
  font-family: inherit;
  font-size: 16px;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
}

.button--primary {
  background-color: var(--primary-color);
  color: white;
}

.button--primary:hover {
  background-color: var(--primary-hover);
}

.button--secondary {
  background-color: transparent;
  border: 1px solid currentColor;
}

.button--icon {
  padding: 8px;
  border-radius: 50%;
  background: transparent;
}

.button--light {
  --primary-color: #4285f4;
  --primary-hover: #3367d6;
  color: #333;
}

.button--dark {
  --primary-color: #8ab4f8;
  --primary-hover: #669df6;
  color: #f1f1f1;
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-icon {
  width: 40px;
  height: 40px;
}

.button-label {
  margin-left: 4px;
}
</style>