import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../features/categories/categorySlice'
import manufacturerReducer from '../features/manufacturers/manufacturerSlice'
import partReducer from '../features/parts/partSlice'

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    manufacturers: manufacturerReducer,
    parts: partReducer,
  },
})
