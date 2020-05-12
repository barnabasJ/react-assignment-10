import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import clone from 'lodash/clone'

import { Photo } from '../src/photos'
import { PhotosView } from '../src/photo-view'

import {  Pagination, goBackward, goForward, goToPage } from '../src/pagination'
import { PaginationView } from '../src/pagination-view'
 
Enzyme.configure({ adapter: new Adapter() });

describe('PhotosView', () => {
  const photos: Photo[] = [
    {
      id: 1,
      albumId: 1,
      title: 'title1' ,
      thumbnailUrl: 'thumb-url1',
      url: 'url1'
    },
    {
      id: 2,
      albumId: 1,
      title: 'title1' ,
      thumbnailUrl: 'thumb-url1',
      url: 'url1'
    }
  ]

  test('it renders', () => {
    shallow(<PhotosView photos={photos}/>)
  })

  test('shows all rendered photos', () => {
    const wrapper = shallow(<PhotosView photos={photos}/>)

    const Photos = wrapper.find('Photo')
    expect(Photos).toHaveLength(2)
  })
})

describe('PaginationView', () => {
  const pagination: Pagination = {
    totalCount: 1000,
    count: 100,
    offset: 100
  }

  const dispatch = jest.fn()

  test('it renders', () => {
    shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)
  })


  test('it calculates the current page', () => {
    const wrapper = shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)
    const input = wrapper.find('input')
    expect(input.props().value).toEqual('2')
  })

  test('dispatches goBackWardAction on back click', () => {
    const wrapper = shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)
    const backLink = wrapper.find('.pagination-back')
    backLink.simulate('click')
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(goBackward())
  })

  test('dispatches goForwardAction on forward click', () => {
    const wrapper = shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)
    const backLink = wrapper.find('.pagination-forward')
    backLink.simulate('click')
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(goForward())
  })

  test('dispatches goToPage on form submit', () => {
    const wrapper = shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)

    let input = wrapper.find('input')
    input.simulate('change', { target: { value: '5' } } )
    input = wrapper.find('input')

    expect(input.props().value).toEqual('5')

    const form = wrapper.find('form')
    form.simulate('submit', { preventDefault: jest.fn() })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(goToPage(5))
  })

  test('dispatches nothing on form submit if page to small', () => {
    const wrapper = shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)

    let input = wrapper.find('input')
    input.simulate('change', { target: { value: '0' } } )
    input = wrapper.find('input')

    expect(input.props().value).toEqual('0')

    const form = wrapper.find('form')
    form.simulate('submit', { preventDefault: jest.fn() })

    expect(dispatch).not.toHaveBeenCalled()
  })

  test('dispatches nothing on form submit if page to small', () => {
    const wrapper = shallow(<PaginationView dispatch={dispatch} pagination={clone(pagination)} />)
    const pageAfterLast = ((pagination.totalCount / pagination.count) + 1).toString()

    let input = wrapper.find('input')
    input.simulate('change', { target: { value: pageAfterLast } } )
    input = wrapper.find('input')

    expect(input.props().value).toEqual(pageAfterLast)

    const form = wrapper.find('form')
    form.simulate('submit', { preventDefault: jest.fn() })

    expect(dispatch).not.toHaveBeenCalled()
  })
})