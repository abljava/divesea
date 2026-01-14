// Утилита для получения случайного изображения

// Дефолтный набор изображений из public/images
const DEFAULT_IMAGES = [
  '/images/slide-1.jpg',
  '/images/slide-2.jpg',
  '/images/slide-3.jpg',
  '/images/slide-4.jpg',
  '/images/slide-5.jpg',
]

/**
 * Выбирает случайное изображение из набора
 * @param images - опциональный массив путей к изображениям. Если не передан, используется дефолтный набор из public/images
 * @returns случайный путь к изображению
 */
export const getRandomImage = (images?: string[]): string => {
  const imageSet = images && images.length > 0 ? images : DEFAULT_IMAGES

  const randomIndex = Math.floor(Math.random() * imageSet.length)
  return imageSet[randomIndex]
}
