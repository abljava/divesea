import { configureStore } from '@reduxjs/toolkit'
import nftReducer from './slices/nftSlice'

export const store = configureStore({
  reducer: {
    nft: nftReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорировать эти типы действий
        ignoredActions: [],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
