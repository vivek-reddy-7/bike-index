import React from 'react'
import styled from 'styled-components'
import { BikeData } from './Home'
import defaultBikeImg from './assets/bike-image.svg'

export interface BikeListProps {
  list: BikeData[]
  apiErrorState: boolean
  isLoading: boolean
}

interface BikeItemProps {
  item: BikeData
  index: number
}

const BikeWrapper = styled.div<{ index: number }>`
padding: 16px;
display: flex;
column-gap: 16px;
background-color: ${({ index }) => (index % 2 === 1 ? 'white' : 'rgb(197 197 197 / 23%)')}
`

const BikeInfo = styled.div`
display: flex;
justify-content: space-between;
 margin-bottom: 10px;
`

const ImageWrapper = styled.div<{ index: number }>`
  align-self: center;
background-color: ${({ index }) => (index % 2 === 1 ? 'rgb(197 197 197 / 23%)' : 'initial')};
`

const TitleDetails = styled.span`
  margin: 0 0 10px 0;
  display: block;
`

const ListWrapper = styled.div`
  padding: 16px;
  min-height: 45px;
    display: flex;
    justify-items: center;
    flex-direction: column;
`

const FallbackText = styled.span`
align-self: center;
`

const BikeInfoWrapper = styled.div`
  width: 100%;
`

function BikeItem (props: BikeItemProps): React.ReactElement {
  const { item, index } = props

  function getPrimaryColors (colors: string[]): string {
    let outputStr = ''
    for (let i = 0; i < colors.length; i++) {
      if (i < colors.length - 1) {
        outputStr += colors[i] + ', '
      } else {
        outputStr += colors[i]
      }
    }
    return outputStr
  }

  return (
    <BikeWrapper index={index} data-testid='bike-item-container'>
      <ImageWrapper index={index}>
        <img src={item.large_img ?? defaultBikeImg} alt="bike" width={100} />
      </ImageWrapper>
      <BikeInfoWrapper>
        <TitleDetails><a href={item.url ?? ''} target='_blank' rel="noreferrer"><strong>{item.title ?? 'unknown'}</strong></a></TitleDetails>
        {item.description !== null ? <TitleDetails>{item.description}</TitleDetails> : ''}

        <BikeInfo >
          <span><strong>Serial: </strong>{item.serial ?? 'unknown'}</span>
          <span><strong style={{ color: 'red' }}>Stolen: </strong>{(item.date_stolen != null) ? new Date(item.date_stolen).toDateString() : 'unknown'}</span>
        </BikeInfo>
        <BikeInfo >
          <span><strong>Primary colors: </strong>{(item.frame_colors != null) ? getPrimaryColors(item.frame_colors) : 'unknown'}</span>
          <span><strong>Location: </strong>{item.stolen_location ?? 'unknown'}</span>
        </BikeInfo>
      </BikeInfoWrapper>

    </BikeWrapper>
  )
}

function BikeList (props: BikeListProps): React.ReactElement {
  const { list, apiErrorState, isLoading } = props
  return (
    <ListWrapper>
      {isLoading
        ? <FallbackText>Loading...</FallbackText>
        : apiErrorState
          ? <FallbackText>Error while fetching bikes</FallbackText>
          : (list.length > 0)
              ? (
                  list.map((bike: BikeData, index: number) => {
                    return <BikeItem item={bike} key={bike.id} index={index} />
                  })
                )
              : <FallbackText>no bikes</FallbackText>}

    </ListWrapper>
  )
}

export { BikeList }
