import * as  React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'

import store from './store'
import photos from './data.json'
import { addMany } from './photos'
import { setOptions } from './pagination'

import { Pagination } from './pagination-view'
import { Photos } from './photo-view'

export const App = () => {
  const dispatch = useDispatch();

  dispatch(addMany(photos))
  dispatch(setOptions({
    count: 100,
    totalCount: photos.length
  }))

  return ( 
   <div>
     <h1>Pagination</h1>
     <Pagination />
     <Photos />
  </div>
 )
}

const Wrapper = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

const render = () => {
  ReactDOM.render(
    <Wrapper/>,
    document.getElementById('root')
  )
}

render()