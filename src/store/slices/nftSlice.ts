import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import type { CoinGeckoNFT } from '@/types'
import { fetchNFTsFromAPI } from '../api/nftApi'

interface NFTState {
  items: CoinGeckoNFT[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: NFTState = {
  items: [],
  status: 'idle',
  error: null,
}

// Async thunk для загрузки NFT
export const fetchNFTs = createAsyncThunk(
  'nft/fetchNFTs',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchNFTsFromAPI()
      return data
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch NFTs'
      )
    }
  }
)

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка pending (начало загрузки)
      .addCase(fetchNFTs.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      // Обработка fulfilled (успешная загрузка)
      .addCase(fetchNFTs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      // Обработка rejected (ошибка загрузки)
      .addCase(fetchNFTs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const selectNFTs = (state: RootState) => state.nft.items
export const selectNFTStatus = (state: RootState) => state.nft.status
export const selectNFTError = (state: RootState) => state.nft.error

export default nftSlice.reducer
