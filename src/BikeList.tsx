import React from 'react'
import styled from 'styled-components'
import { BikeData } from './Home'
import defaultBikeImg from './assets/bike-image.svg'

export interface BikeListProps {
  list: BikeData[]
}

interface BikeItemProps {
  item: BikeData
  index: number
}

const BikeWrapper = styled.div<{ index: number }>`
padding: 10px;
display: flex;
column-gap: 16px;
background-color: ${({ index }) => (index % 2 === 0 ? 'white' : 'rgb(197 197 197 / 23%)')}
`

const BikeInfo = styled.div`
display: flex;
justify-content: space-between;
 margin-bottom: 10px;
`

const ImageWrapper = styled.div<{ index: number }>`
  align-self: center;
background-color: ${({ index }) => (index % 2 === 0 ? 'rgb(197 197 197 / 23%)' : 'initial')};
`

const TitleDetails = styled.span`
  margin: 0 0 10px 0;
  display: block;
`

function BikeItem (props: BikeItemProps): React.ReactElement {
  const { item, index } = props

  function getPrimaryColors (colors: string[]): string {
    let outputStr = ''
    for (let i = 0; i < colors.length; i++) {
      outputStr += colors[i] + ', '
    }
    return outputStr
  }

  return (
    <BikeWrapper index={index}>
      <ImageWrapper index={index}>
        <img src={item.large_img ?? defaultBikeImg} alt="bike" width={100} />
      </ImageWrapper>
      <div style={{ width: '100%' }}>
      <div >
        <TitleDetails><a href={item.url ?? ''} target='_blank' rel="noreferrer"><strong>{item.title ?? 'unknown'}</strong></a></TitleDetails>
        {item.description !== null ? <TitleDetails>{item.description}</TitleDetails> : ''}

      </div>
        <BikeInfo >
          <span><strong>Serial: </strong>{item.serial ?? 'unknown'}</span>
          <span style={{ color: 'red' }}><strong>Stolen: </strong>{(item.date_stolen != null) ? new Date(item.date_stolen).toDateString() : 'unknown'}</span>
        </BikeInfo>
        <BikeInfo >
          <span><strong>Primary colors: </strong>{(item.frame_colors != null) ? getPrimaryColors(item.frame_colors) : 'unknown'}</span>
          <span><strong>Location: </strong>{item.stolen_location ?? 'unknown'}</span>
        </BikeInfo>
      </div>

    </BikeWrapper>
  )
}

function BikeList (props: BikeListProps): React.ReactElement {
  const { list } = props
  return (
    <div style={{ padding: '10px' }}>
      {(list.length > 0)
        ? (
            list.map((bike: BikeData, index: number) => {
              return <BikeItem item={bike} key={bike.id} index={index} />
            })
          )
        : <span>no bikes</span> }
    </div>
  )
}

export { BikeList }
