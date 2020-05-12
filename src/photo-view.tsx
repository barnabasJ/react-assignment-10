import React from 'react'
import slice from 'lodash/slice'
import map from 'lodash/map'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { Pagination } from './pagination'
import { selectIds, selectEntities, Photo as PhotoType } from './photos'

const Photo: React.FunctionComponent<{url: string}> = ({url }) => {
  return (
    <img style={
      {
        width: '10%',
        height: 'auto',
      }
    } src={url}/>
  )
}

const paginationSelector = (state: RootState): Pagination => state.pagination

const currentPhotosSelector = createSelector(
  [paginationSelector, selectIds, selectEntities], 
  ({count, offset}, ids, photos) => {
    const currentIds = slice(ids, offset, offset + count)
    return map(currentIds, (id) => photos[id])
  }
)

export const PhotosView: React.FunctionComponent<{
  photos: PhotoType[]
}> = ({photos}) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex'
    }}>
      { map(photos, ({url, id}: PhotoType) => <Photo key={id} url={url} />)}
    </div>
  )
}

export const Photos: React.FunctionComponent = () => {
  const photos: PhotoType[] = useSelector(currentPhotosSelector)
  return (
    <PhotosView photos={photos} />
  )
}