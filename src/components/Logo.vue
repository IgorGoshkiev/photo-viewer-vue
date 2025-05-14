<template>
  <div 
    :class="['logo', { 'logo--clickable': clickable }]"
    :style="{ fontSize: size }"
    @click="handleClick"
  >
    Photo Viewer
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
    validator: (value: string) => ['light', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: '24px',
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: null,
  },
})

const emit = defineEmits(['click'])
const router = useRouter()

const textColor = computed(() => {
  return props.theme === 'dark' ? 'white' : 'red'
})

const handleClick = () => {
  if (props.clickable) {
    if (props.to) router.push(props.to)
    emit('click')
  }
}
</script>

<style scoped>
.logo {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: v-bind(textColor);
  transition: all 0.3s ease;
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
}

.logo--clickable {
  cursor: pointer;
}

.logo--clickable:hover {
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .logo--clickable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>