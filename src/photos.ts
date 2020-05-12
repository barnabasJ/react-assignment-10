import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from './rootReducer';

export interface Photo { 
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const photoAdapter = createEntityAdapter<Photo>({
  sortComparer: (p1, p2) => (p1.id - p2.id) % 2
});

export const {
  selectIds,
  selectEntities
} = photoAdapter.getSelectors((state: RootState): State  => state.photos)

const initialState = photoAdapter.getInitialState()

type State = ReturnType<typeof photoAdapter.getInitialState>

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addMany: (state, action): void =>  {
      photoAdapter.addMany(state, action.payload)
    }
  }
})

export const {
  addMany
} = photoSlice.actions

export default photoSlice.reducer
