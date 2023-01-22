import styles from './TicTac.module.css'
import Card from './Card'
import { useState } from 'react'
const TicTac = (props) => {
  const [items, setItems] = useState(Array(9).fill(null))
  const [xNext, setXNext] = useState(true)

  const handleClick = (itemIndex) => {
    if (items[itemIndex]) return
    const nextState = items.slice()

    if (xNext) {
      nextState[itemIndex] = 'X'
    } else {
      nextState[itemIndex] = 'O'
    }

    setItems(nextState)
    setXNext((prevState) => !prevState)
  }

  return (
    <Card>
      <div className={styles.box}>
        <button className={styles['item-1']} onClick={() => handleClick(0)}>
          {items[0]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(1)}>
          {items[1]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(2)}>
          {items[2]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(3)}>
          {items[3]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(4)}>
          {items[4]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(5)}>
          {items[5]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(6)}>
          {items[6]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(7)}>
          {items[7]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(8)}>
          {items[8]}
        </button>
      </div>
    </Card>
  )
}

export default TicTac
