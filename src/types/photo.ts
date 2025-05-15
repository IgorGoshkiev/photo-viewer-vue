// Тип для фото
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Определяем тип для колонок
export interface Column {
  key: keyof Photo;
  label: string;
}