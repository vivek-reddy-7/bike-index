import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { BikeList } from './BikeList'
import { BikeData, ApiErrorState } from './Home'

const itemOne: BikeData = {
  date_stolen: 1667252196,
  description: 'lorem ipsum',
  frame_colors: [
    'Silver, gray or bare metal'
  ],
  frame_model: 'Touring Edition',
  id: 1432697,
  is_stock_img: false,
  large_img: null,
  location_found: null,
  manufacturer_name: 'Fuji',
  external_id: null,
  registry_name: null,
  registry_url: null,
  serial: 'Unknown',
  status: 'stolen',
  stolen: true,
  stolen_coordinates: [
    41.5,
    -81.67
  ],
  stolen_location: 'Cleveland, OH 44115, US',
  thumb: null,
  title: '2022 Fuji Touring Edition',
  url: 'https://bikeindex.org/bikes/1432697',
  year: 2022
}

const itemTwo: BikeData =
  {
    date_stolen: null,
    description: 'dolor set amit',
    frame_colors: [
      'Blue',
      'White'
    ],
    frame_model: 'Criterium',
    id: 1432692,
    is_stock_img: false,
    large_img: null,
    location_found: '35th Ave NE & NE 113th St, Seattle, WA 98125, US',
    manufacturer_name: 'Cannondale',
    external_id: null,
    registry_name: null,
    registry_url: null,
    serial: 'Hidden',
    status: 'found',
    stolen: false,
    stolen_coordinates: null,
    stolen_location: null,
    thumb: null,
    title: 'Cannondale Criterium',
    url: 'https://bikeindex.org/bikes/1432692',
    year: null
  }

export const listItems = [itemOne, itemTwo]
const apiErrorStateOne: ApiErrorState = {
  count: false,
  list: false
}
const apiErrorStateTwo: ApiErrorState = {
  count: false,
  list: true
}

describe('bike list', () => {
  test('if all items render', () => {
    render(<BikeList list={listItems} isLoading={false} apiErrorState={apiErrorStateOne.list} />)
    expect(screen.getAllByTestId('bike-item-container').length).toBe(2)
  })

  test('if fallback text is displayed appropriately', () => {
    render(<BikeList list={[]} isLoading={false} apiErrorState={apiErrorStateOne.list} />)
    expect(screen.getByText('no bikes')).toBeInTheDocument()
    cleanup()
    render(<BikeList list={[]} isLoading={true} apiErrorState={apiErrorStateOne.list} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    cleanup()
    render(<BikeList list={[]} isLoading={false} apiErrorState={apiErrorStateTwo.list} />)
    expect(screen.getByText('Error while fetching bikes')).toBeInTheDocument()
  })
})
