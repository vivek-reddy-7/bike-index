/* eslint-disable no-useless-return */
import React, { useEffect, useState, useRef } from 'react'
import { Pagination } from '@mui/material'
import styled from 'styled-components'
import { BikeList } from './BikeList'
import { SearchComponent } from './SearchComponent'
import { fetchBikes, fetchCount } from './api/fetchData'

export interface BikeApiResponse {
  bikes: BikeData[]
}

export interface BikeData {
  date_stolen: number | null
  description: string | null
  frame_colors: string[] | null
  frame_model: string | null
  id: number | null
  is_stock_img: boolean | null
  large_img: string | null
  location_found: string | null
  manufacturer_name: string | null
  external_id: number | string | null
  registry_name: string | null
  registry_url: string | null
  serial: string | null
  status: string | null
  stolen: boolean | null
  stolen_coordinates: number[] | null
  stolen_location: string | null
  thumb: string | null
  title: string | null
  url: string | null
  year: number | null
}

export interface CountApiResponse {
  non: number
  stolen: number
  proximity: number
}

export interface ApiErrorState {
  count: boolean
  list: boolean
}

const HomeTitle = styled.div`
text-align: center;
`
const PaginationWrapper = styled.div`
display: flex; 
justify-content: flex-end; 
margin-top: 16px;
`

const HomeWrapper = styled.div`
  padding: 24px 5%;
`

const BikeCountWrapper = styled.div`
  padding: 16px;
`

const Home: React.FC = (): React.ReactElement => {
  const [bikeArr, setBikeArr] = useState<BikeData[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bikeCount, setBikeCount] = useState<number>(0)
  const [searchInput, setSearchInput] = useState<string>('')
  const prevSearch = useRef<string>('')
  const [apiError, SetApiError] = useState<ApiErrorState>({ count: false, list: false })

  const pageCount = Math.ceil(bikeCount / 10)

  function handlePageChange (event: React.ChangeEvent<unknown>, pageNum: number): void {
    setPage(pageNum)
  }

  async function getCount (query: string): Promise<undefined> {
    const count = await fetchCount(query)
    if (count !== undefined) {
      setBikeCount(count)
      SetApiError({ ...apiError, count: false })
    } else {
      SetApiError({ ...apiError, count: true })
    }
    return
  }

  async function getBikes (pageNum: number, query: string): Promise<undefined> {
    const newBikes = await fetchBikes(pageNum, query)
    if (newBikes !== undefined) {
      setBikeArr(newBikes)
      SetApiError({ ...apiError, list: false })
    } else {
      SetApiError({ ...apiError, list: true })
    }
    return
  }

  useEffect(() => {
    void getCount(searchInput)
  }, [])

  useEffect(() => {
    async function helper (): Promise<undefined> {
      setIsLoading(true)
      if (searchInput !== prevSearch.current) {
        await getCount(searchInput)
      }
      await getBikes(page, searchInput)
      setIsLoading(false)
      return
    }

    void helper()
  }, [page, searchInput])

  useEffect(() => {
    prevSearch.current = searchInput
  }, [searchInput])

  return (
    <HomeWrapper>
      <HomeTitle><span><strong>Stolen bikes in the Sydney Area</strong></span></HomeTitle>
      <SearchComponent setPage={setPage} setSearchInput={setSearchInput} isSearchDisabled={isLoading} />
      <BikeCountWrapper>
        <span>Bike Count: {isLoading ? 'Loading...' : apiError.count ? 'Error while fetching count' : bikeCount}</span>
      </BikeCountWrapper>
      <div data-testid='listDiv'>
           <BikeList list={bikeArr} apiErrorState={apiError.list} isLoading={isLoading} />

      </div>

    <PaginationWrapper data-testid='paginationDiv'>
    <Pagination count={pageCount} variant="outlined" shape="rounded" onChange={handlePageChange} disabled={isLoading} page={page} />
    </PaginationWrapper>
    </HomeWrapper>

  )
}

export { Home }
