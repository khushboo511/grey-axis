import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { postsApi } from './services/postApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export default configureStore({
  reducer: {
    counter: counterReducer,
    [postsApi.reducerPath]: postsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),  
})

setupListeners(configureStore.dispatch)