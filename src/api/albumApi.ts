import config from '@/config';

export const fetchPhotos = async (albumIds: string[] = []) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Таймаут 10 сек

  try {
    const params = albumIds.map(id => `albumId=${id}`).join('&');
    const url = albumIds.length 
      ? `${config.API_BASE_URL}/photos?${params}`
      : `${config.API_BASE_URL}/photos`;

    const response = await fetch(url, {
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
    // Попробуем загрузить локальные данные при ошибке
    try {
      const fallbackData = await import('@/assets/fallback-photos.json');
      return filterByAlbumIds(fallbackData.default, albumIds);
    } catch (e) {
      throw new Error('Не удалось загрузить ни удаленные, ни локальные данные');
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

function filterByAlbumIds(photos: any[], albumIds: string[]) {
  if (!albumIds.length) return photos;
  return photos.filter(photo => albumIds.includes(String(photo.albumId)));
}