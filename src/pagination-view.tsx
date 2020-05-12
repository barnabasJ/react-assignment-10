import React, { useCallback, useState, useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination as PaginationType } from './types'
import { RootState, Dispatch } from './store'
import { goBackward, goForward, goToPage } from './pagination';

const calcCurrentPage = (pagination: PaginationType): number => 
  (pagination.offset / pagination.count) + 1

const calcLastPage = (pagination: PaginationType): number => 
  Math.ceil(pagination.totalCount / pagination.count)

const isFirstPage = (pagination: PaginationType): boolean => 
  calcCurrentPage(pagination) === 1

const isLastPage = (pagination: PaginationType): boolean => 
  calcCurrentPage(pagination) === calcLastPage(pagination)

export const PaginationView: React.FunctionComponent<{
  dispatch: Dispatch;
  pagination: PaginationType;
}> = ({dispatch, pagination}) => {

  const [page, setPage] = useState(calcCurrentPage(pagination).toString())

  useEffect(() => {
    setPage(calcCurrentPage(pagination).toString())
  }, [pagination])

  const onChange = useCallback((evt) => {
    const newPage = evt.target.value
    setPage(newPage)
  }, [pagination, setPage])

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault()
    const newPage = parseInt(page, 10) 
    if(!isNaN(newPage) && newPage >= 1 && newPage <= calcLastPage(pagination))
      dispatch(goToPage(newPage))
  }, [goToPage, page, pagination])


  return (
    <div>
      { !isFirstPage(pagination) && <a className="pagination-back"  href="#" onClick={() => dispatch(goBackward())}>back</a> }
      <form onSubmit={onSubmit}>
        <input value={page} onChange={onChange}/><span>{`/${calcLastPage(pagination)}`}</span>
        <button type="submit" >Go</button>
      </form>
      { !isLastPage(pagination) && <a className="pagination-forward" href="#" onClick={() => dispatch(goForward())}>forward</a> }
    </div>
  )
}

export const Pagination: React.FunctionComponent<{
}> = () => {
  const pagination: PaginationType = useSelector((state: RootState): PaginationType => state.pagination)
  const dispatch = useDispatch();

  return (
    <PaginationView dispatch={dispatch} pagination={pagination} />
  )
}