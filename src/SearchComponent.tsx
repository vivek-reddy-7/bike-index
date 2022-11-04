import React, { useRef } from 'react'
import styled from 'styled-components'

const SearchButton = styled.button`
border-radius: 5px;
border: none;
padding: 5px 10px;
background-color: #008000cc;
font-weight: bold;
color: white;
`

const SearchInput = styled.input`
  padding: 5px 10px;
  margin-right: 16px;
  width: 250px;
`

const SearchWrapper = styled.div`
display: flex;
justify-content: center;
margin: 24px 0;
`

interface SearchProps {
  setSearchInput: (input: string) => void
  isSearchDisabled: boolean
  setPage: (page: number) => void
}

function SearchComponent (props: SearchProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setSearchInput, isSearchDisabled, setPage } = props

  function handleChange (): void {
    const inputEl = inputRef.current
    if (inputEl != null) {
      setSearchInput(inputEl.value.trim())
      setPage(1)
    }
  }

  return (
    <SearchWrapper data-testid='search-wrapper'>
      <SearchInput type="text" ref={inputRef} placeholder='Search Title or Description' />
      <SearchButton onClick={handleChange} disabled={isSearchDisabled} >Search</SearchButton>
    </SearchWrapper>
  )
}

export { SearchComponent }
