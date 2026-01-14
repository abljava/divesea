// Утилита для генерации ставки

/**
 * Генерирует случайную ставку от 0.1 до 10 ETH
 * @returns строка в формате "X.XX" (например, "1.75")
 */
export const generateBid = (): string => {
  // Генерируем случайное значение от 0.1 до 10
  const min = 0.1
  const max = 10
  const bid = Math.random() * (max - min) + min

  // Округляем до 2 знаков после запятой
  return bid.toFixed(2)
}
