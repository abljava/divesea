import type { CoinGeckoNFT } from '@/types'

const API_URL = 'https://api.coingecko.com/api/v3/nfts/list'

// Функция для запроса к CoinGecko API
export const fetchNFTsFromAPI = async (): Promise<CoinGeckoNFT[]> => {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data.map((item: { name: string }) => ({
      name: item.name,
    }))
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch NFTs'
    )
  }
}
