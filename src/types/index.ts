// Тип ответа API от CoinGecko
export interface CoinGeckoNFT {
  name: string
  // Остальные поля из API не используются, нужен только 'name'
}

// Типы для NFT карточки
export interface NFTCardData {
  id: string
  name: string
  image: string
  timer: string
  currentBid: string
}

// Пропсы для компонента NFTCard
export interface NFTCardProps {
  nft: NFTCardData
  className?: string
}
