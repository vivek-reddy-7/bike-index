import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { SearchComponent } from './SearchComponent'

describe('Search Component', () => {
  const setPageMock = jest.fn()
  const setSearchInputMock = jest.fn()

  test('if search button works as expected', () => {
    render(<SearchComponent isSearchDisabled={false} setPage={setPageMock} setSearchInput={setSearchInputMock} />)
    const searchButton = screen.getByRole('button', { name: 'Search' })
    expect(searchButton).toBeInTheDocument()
    fireEvent(searchButton, new MouseEvent('click', { bubbles: true }))
    expect(setPageMock).toBeCalledWith(1)
    expect(setSearchInputMock).toBeCalledWith('')
  })
})
