import styles from './TicTac.module.css'
import Card from './Card'
import { useEffect, useState, useReducer } from 'react'
import Winner from './Winner'

const initialState = {
  items: Array(9).fill(null),
  player: true,
  winner: '',
  blocked: false,
}

const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 9],
  [0, 4, 8],
  [2, 4, 6],
]
function checkWinner(items) {
  let winner = ''
  if (winner === '') {
    console.log(winner)
    const itemsState = items.slice()
    for (let i = 0; i <= 7; i++) {
      let j = 0
      // console.log(itemsState)
      if (
        itemsState[winning[i][j]] === itemsState[winning[i][j + 1]] &&
        itemsState[winning[i][j + 1]] === itemsState[winning[i][j + 2]] &&
        itemsState[winning[i][j + 2]] != null
      ) {
        if (itemsState[winning[i][j]] === 'X') winner = 'X'
        else winner = 'O'
      }
    }

    return winner
  }
}

const reducer = (state, action) => {
  if (action.type === 'playing') {
    const winner = checkWinner(action.payload.items)
    let blocked

    action.payload.handlePlay(action.payload.items, action.payload.player)
    if (winner) {
      blocked = true
    }
    return {
      items: action.payload.items,
      player: action.payload.player,
      winned: winner,
      blocked: blocked,
    }
  }
  if (action.type === 'receive-play') {
    const winner = checkWinner(action.payload.items)
    let blocked
    if (winner) {
      blocked = true
    }
    return {
      items: action.payload.items,
      player: action.payload.player,
      winned: winner,
      blocked: blocked,
    }
  }
  if (action.type === 'reset') return initialState
}

const TicTac = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const socket = props.socket

  const handleClick = (itemIndex) => {
    const items = state.items.slice()
    const xNext = state.player
    if (items[itemIndex]) return

    const nextState = items.slice()

    if (xNext) {
      nextState[itemIndex] = 'X'
    } else {
      nextState[itemIndex] = 'O'
    }
    console.log(xNext)
    if (!state.blocked)
      dispatch({
        type: 'playing',
        payload: { items: nextState, player: !xNext, handlePlay: handlePlay },
      })
  }

  function handlePlay(items, player) {
    socket.emit('play', { items: items, room: props.room, player: player })
  }

  useEffect(() => {
    socket.on('receive-play', (data) => {
      if (!state.blocked)
        dispatch({
          type: 'receive-play',
          payload: { items: data.items, player: data.player },
        })
    })
  }, [socket])

  function handleReset() {
    dispatch({ type: 'reset' })
  }
  // useEffect(() => {
  //   socket.emit('play', {
  //     items: items,
  //     room: props.room,
  //   })
  //   console.log('first')
  // }, [items])

  // const handleChangeUpdate = () => {
  //   console.log('called')
  //   socket.on('receive-play', (data) => {
  //     console.log(data.items)
  //     setItems(data.items)
  //   })
  // }

  // useEffect(() => {
  //   handleChangeUpdate()
  // }, [handleChangeUpdate])

  // useEffect(() => {
  //   socket.on('receive-play', (data) => {
  //     console.log(items)
  //     if (!items[data.itemIndex]) {
  //       console.log('socket on')
  //       const nextState = items.slice()
  //       console.log(nextState)
  //       console.log('useeffect')
  //       if (!data.xNext) nextState[data.itemIndex] = 'X'
  //       else nextState[data.itemIndex] = 'O'

  //       setItems(nextState)
  //       setXNext(!data.xNext)
  //     }
  //     console.log(data)
  //   })
  // }, [socket])

  return (
    <Card>
      {(state.winned || (!state.winned && !state.items.includes(null))) && (
        <>
          <Winner winner={state.winned}>
            {state.winned ? `${state.winned} has won` : `It's a draw`}
          </Winner>
          <button onClick={handleReset}>Reset</button>
        </>
      )}

      <div className={styles.box}>
        <button className={styles['item-1']} onClick={() => handleClick(0)}>
          {state.items[0]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(1)}>
          {state.items[1]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(2)}>
          {state.items[2]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(3)}>
          {state.items[3]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(4)}>
          {state.items[4]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(5)}>
          {state.items[5]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(6)}>
          {state.items[6]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(7)}>
          {state.items[7]}
        </button>
        <button className={styles['item-1']} onClick={() => handleClick(8)}>
          {state.items[8]}
        </button>
      </div>
    </Card>
  )
}

export default TicTac
