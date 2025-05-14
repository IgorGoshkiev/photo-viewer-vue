import config from '@/config';

export const fetchPhotos = async (albumIds: string[] = []) => {
  try {
    // Формируем URL с параметрами, если albumIds не пуст
    const params = albumIds.map(id => `albumId=${id}`).join('&');
    const url = albumIds.length 
      ? `${config.API_BASE_URL}/photos?${params}`
      : `${config.API_BASE_URL}/photos`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка загрузки фото');
    return await response.json();
  } catch (error) {
    console.error('fetchPhotos error:', error);
    throw error;
  }
};