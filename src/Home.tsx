import React, { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import { BikeList } from './BikeList'

interface BikeApiResponse {
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

async function fetchBikes (page: number): Promise<BikeData[] | undefined> {
  try {
    const res = await fetch(`https://bikeindex.org/api/v3/search?page=${page}&per_page=10&location=Sydney&distance=10&stolenness=proximity`)
    const data = await res.json() as BikeApiResponse

    return data.bikes
  } catch (err) {
    console.log(err)
    alert('Something went wrong.')
  }
}

async function fetchCount (): Promise<number | undefined> {
  try {
    const res = await fetch('https://bikeindex.org/api/v3/search/count?location=sydney&distance=10&stolenness=stolen')
    const data = await res.json() as CountApiResponse

    return data.proximity
  } catch (error) {
    console.log(error)
    alert('Something went wrong.')
  }
}

const Home: React.FC = (): React.ReactElement => {
  const [bikeArr, setBikeArr] = useState<BikeData[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [bikeCount, setBikeCount] = useState<number | null>(null)

  const pageCount = (bikeCount != null) ? Math.ceil(bikeCount / 10) : 0

  function handlePageChange (event: React.ChangeEvent<unknown>, pageNum: number): void {
    setPage(pageNum)
  }

  useEffect(() => {
    async function getBikes (page: number): Promise<undefined> {
      setIsLoading(true)
      const newBikes = await fetchBikes(page)
      if (newBikes !== undefined) {
        setBikeArr(newBikes)
        setIsLoading(false)
      }
      setIsLoading(false)
      // eslint-disable-next-line no-useless-return
      return
    }

    void getBikes(page)
  }, [page])

  useEffect(() => {
    async function getCount (): Promise<undefined> {
      const count = await fetchCount()
      if (count !== undefined) {
        setBikeCount(count)
      }
      // eslint-disable-next-line no-useless-return
      return
    }

    void getCount()
  }, [])

  return (
    <div style={{ width: '900px', margin: '10px auto' }}>
      <div>
        <span>Bike Count: {bikeCount === null ? 'Loading' : bikeCount}</span>
      </div>
      <div data-testid='listDiv'>
        {isLoading
          ? 'Loading'
          : <BikeList list={bikeArr} />
        }
      </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }} data-testid='paginationDiv'>
    <Pagination count={pageCount} variant="outlined" shape="rounded" onChange={handlePageChange} disabled={isLoading} page={page} />
    </div>
    </div>

  )
}

export { Home }
