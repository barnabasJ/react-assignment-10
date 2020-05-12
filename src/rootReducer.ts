import { combineReducers } from '@reduxjs/toolkit'
import photos from './photos'
import pagination from './pagination'

const rootReducer = combineReducers({
  photos,
  pagination
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
