import { createSlice } from '@reduxjs/toolkit'
import merge from 'lodash/merge'

export interface Pagination {
  totalCount: number;
  count: number;
  offset: number;
}

const initialState: Pagination = {
    totalCount: 0,
    count: 0,
    offset: 0
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setOptions: (state, action): void => {
        merge(state, action.payload)
    },
    goForward: (state): void => {
      state.offset += state.count
    },
    goBackward: (state): void =>  {
      state.offset -= state.count
    },
    goToPage: (state, action): void => {
      state.offset = (state.count * action.payload) - state.count
    }
  }
})

export default paginationSlice.reducer

export const {
  goForward,
  goBackward,
  goToPage,
  setOptions
} = paginationSlice.actions