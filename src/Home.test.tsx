import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from './Home'

describe('Home', () => {
  test('if list and pagination render', () => {
    render(<Home />)
    expect(screen.getByTestId('listDiv')).toBeInTheDocument()
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(screen.getByTestId('paginationDiv')).toBeInTheDocument()
  })
})
