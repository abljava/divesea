// Утилита для генерации таймера

/**
 * Генерирует случайное время до окончания в формате "07h 09m 12s"
 * Время от 1 до 24 часов
 * @returns строка в формате "XXh XXm XXs"
 */
export const generateTimer = (): string => {
  // Генерируем случайное количество часов от 1 до 24
  const hours = Math.floor(Math.random() * 24) + 1
  // Генерируем случайное количество минут от 0 до 59
  const minutes = Math.floor(Math.random() * 60)
  // Генерируем случайное количество секунд от 0 до 59
  const seconds = Math.floor(Math.random() * 60)

  // Форматируем с ведущими нулями
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`
}
