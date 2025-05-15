<template>
  <footer class="footer">
    <div class="social-icons">
      <a
        v-for="(icon, index) in socialIcons"
        :key="index"
        :href="icon.link"
        target="_blank"
        rel="noopener noreferrer"
        class="social-icon"
      >
        <img :src="icon.src" :alt="icon.alt" />
      </a>
    </div>
  </footer>
</template>

<script lang="ts">

import vkIcon from '@/assets/icons/footer/vk.svg?url';
import youtubeIcon from '@/assets/icons/footer/youtube.svg?url';
import okIcon from '@/assets/icons/footer/ok.svg?url';
import telegramIcon from '@/assets/icons/footer/telegram.svg?url';

export default {
  name: "Footer",
  data() {
    return {
      socialIcons: [
        { src: vkIcon, alt: "VK", link: "https://vk.ru" },
        { src: youtubeIcon, alt: "YouTube", link: "https://youtube.com" },
        { src: okIcon, alt: "Odnoklassniki", link: "https://ok.ru" },
        { src: telegramIcon, alt: "Telegram", link: "https://telegram.org" }
      ]
    };
  }
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 25px;
}

.social-icon img {
  width: 35px;
  height: 35px;
  transition: opacity 0.3s ease;
}

.social-icon img:hover {
  opacity: 0.7;
}


@media (max-width: 767px) {
  .footer {
    justify-content: flex-start;
  }
}


</style>