import type { ReactNode } from 'react'

// Тип ответа API от CoinGecko
export interface CoinGeckoNFT {
  name: string
  // Остальные поля из API не используются, нужен только 'name'
}

// Тип состояния загрузки
export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

// Типы для NFT карточки
export interface NFTCardData {
  id: string
  name: string
  image: string
  timer: string
  currentBid: string
}

// Пропсы для компонента Button
export interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

// Пропсы для компонента Timer
export interface TimerProps {
  hours: number
  minutes: number
  seconds: number
  className?: string
}

// Пропсы для компонента NFTCard
export interface NFTCardProps {
  nft: NFTCardData
  className?: string
}

// Пропсы для компонента NFTSlider
export interface NFTSliderProps {
  className?: string
}

// Статистика для Hero секции
export interface StatisticsItem {
  value: string
  label: string
}
