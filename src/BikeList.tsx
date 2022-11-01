import React from "react";
import {BikeData} from './Home'
import styles from './BikeList.module.css'

export interface BikeListProps {
  list: BikeData[]
}

interface BikeItemProps {
  item: BikeData,
  rootClass: string
}

function BikeItem (props: BikeItemProps): React.ReactElement {
  const {item, rootClass} = props

  function getPrimaryColors (colors: string[]) : string {
    let outputStr = ''
    colors.map((color) => {
      outputStr += color + ', '
    })
    return outputStr
  }

  return (
    <div className={rootClass}>
      <div >
        <span><a href={item.url || ''} target='_blank'><strong>{item.title || 'unknown'}</strong></a></span>
      </div>
      <div style={{margin: '10px 0'}}>
        <div className={styles.itemInfo}>
          <span style={{color: 'red'}}><strong>Serial: </strong>{item.serial || 'unknown'}</span>
          <span><strong>Stolen: </strong>{item.date_stolen ? new Date(item.date_stolen).toISOString() : 'unknown'}</span>
        </div>
        <div className={styles.itemInfo}>
          <span><strong>Primary colors: </strong>{item.frame_colors ? getPrimaryColors(item.frame_colors) : 'unknown'}</span>
          <span><strong>Location: </strong>{item.stolen_location || 'unknown'}</span>
        </div>
      </div>
    </div>
  )
}

function BikeList (props: BikeListProps) : React.ReactElement {
  const {list } = props
  return (
    <div style={{padding: '10px'}}>
      {list.length ? (
      list.map((bike: BikeData, index: number) => {
        const itemRootClass = index % 2 == 0 ? `${styles.greyBkg} ${styles.itemWrapper}`: styles.itemWrapper
        return <BikeItem item={bike} key={bike.id} rootClass={itemRootClass} />
      })
    ) : <span>no bikes</span> }
    </div>
  )
}

export {BikeList}