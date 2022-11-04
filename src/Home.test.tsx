/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Home, CountApiResponse, BikeApiResponse } from './Home'
import * as apiCalls from './api/fetchData'
import { listItems } from './BikeList.test'

describe('Home', () => {
  const mockCountRes: CountApiResponse = {
    non: 20,
    stolen: 30,
    proximity: 15
  }

  const mockBikesRes: BikeApiResponse = {
    bikes: listItems
  }

  const fetchBikesSpy = jest.spyOn(apiCalls, 'fetchBikes')
  const fetchCountSpy = jest.spyOn(apiCalls, 'fetchCount')

  fetchBikesSpy.mockReturnValue(Promise.resolve(mockBikesRes.bikes))
  fetchCountSpy.mockReturnValue(Promise.resolve(mockCountRes.proximity))

  beforeEach(() => {
    act(() => {
      render(<Home />)
    })
  })

  test('if initial content renders', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByTestId('search-wrapper')).toBeInTheDocument()
  })

  test('if api calls are made', () => {
    expect(fetchBikesSpy).toBeCalledWith(1, '')
    expect(fetchCountSpy).toBeCalledWith('')
  })

  test('if api data renders correctly', async () => {
    await waitFor(() => {
      expect(screen.getByText(`Bike Count: ${mockCountRes.proximity}`)).toBeInTheDocument()
      expect(screen.getByText(listItems[0].description!)).toBeInTheDocument()
    })
  })

  test('if search button triggers api calls', () => {
    const searchButton = screen.getByRole('button', { name: 'Search' })
    act(() => {
      fireEvent(searchButton, new MouseEvent('click', { bubbles: true }))
    })
    expect(fetchBikesSpy).toBeCalled()
    expect(fetchCountSpy).toBeCalled()
  })
})
