import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Card from './components/Card'
import TicTac from './components/TicTac'
const socket = io.connect('http://localhost:4000')

function App() {
  const [message, setMessage] = useState('')
  const [receivedMessage, setReceivedMessage] = useState('')
  const [room, setRoom] = useState('')
  const [joined, setJoined] = useState(false)

  const sendMessage = (event) => {
    event.preventDefault()
    socket.emit('send-message', { message: message, room: room })
  }
  //sent event

  //reveive event
  useEffect(() => {
    socket.on('receive-message', (data) => {
      console.log(data)
      setReceivedMessage(data.message)
    })
  }, [socket])

  const joinRoomHandler = () => {
    if (room !== '') {
      socket.emit('join_room', room)
      setJoined(true)
    }
  }
  const leaveRoomHandler = () => {
    if (room) {
      socket.emit('leave_room', room)
      setJoined(false)
    }
  }

  return (
    <div>
      {joined && (
        <>
          <input
            onChange={(event) => {
              event.preventDefault()
              setMessage(event.target.value)
            }}
          ></input>
          <button onClick={sendMessage}> SendMessage</button>
          <button onClick={leaveRoomHandler}>leave Room</button>
          <h1>{receivedMessage}</h1>
          <TicTac socket={socket} room={room} />
        </>
      )}
      {!joined && (
        <>
          <input
            onChange={(event) => {
              event.preventDefault()
              setRoom(event.target.value)
            }}
          ></input>
          <button onClick={joinRoomHandler}>Join Room</button>
          <h1>{receivedMessage}</h1>
        </>
      )}
    </div> //
  )
}

export default App
