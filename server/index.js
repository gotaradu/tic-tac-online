// const { MongoClient } = require('mongodb')
// const express = require('express')

// app = express()
// const http = require('http').Server(app)
// const cors = require('cors')
// const socketIo = require('socket.io')(http, {
//   cors: { origin: 'http://localhost:4000' },
// })
// app.use(cors())

// const port = 4000

// socketIo.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`)
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected')
//   })
// })
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello world',
//   })
// })

// http.listen(port, () => {
//   console.log(`Server listening on ${port}`)
// })
// const url =
//   'mongodb+srv://pocneste:eDUWUNg7qMlHopti@cluster0.jnxf09f.mongodb.net/?retryWrites=true&w=majority'

// const client = new MongoClient(url)

// async function run() {
//   try {
//     await client.connect()

//     const database = client.db('radu')
//     //console.log(database)
//     const collection = database.collection('radu')
//     //console.log(collection)
//     const result = await collection.insertOne({ name: 'gota' })
//     //console.log(result)

//     const data = await collection.findOne({ name: 'gota' }) //query
//     console.log(data)
//   } finally {
//     await client.close()
//   }
// }
// // run().catch(console.dir)

const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const server = http.createServer(app)
const rooms = [{ id: -1 }]
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on('join_room', (room) => {
    let count = 0

    console.log(rooms[0].id)
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id == room) {
        count++
      }
    }
    if (count > 1) {
      console.log('FULL')
      socket.emit('enable-render', false)
    } else {
      console.log(count)
      rooms.push({ id: room })
      socket.join(room)
      enabled = true
      socket.emit('enable-render', true)
    }
    console.log(rooms)
  })
  socket.on('leave_room', (data) => {
    const room = rooms.find((room) => room.id == data)
    const index = rooms.indexOf(room)
    console.log(index)
    rooms.splice(index, 1)

    socket.leave(data)
    console.log(rooms)
  })
  socket.on('send-message', (data) => {
    socket.to(data.room).emit('receive-message', data)
  })

  socket.on('play', (data) => {
    console.log(data)
    socket.to(data.room).emit('receive-play', data)
  })
  socket.on('reset', (data) => {
    console.log(data)
    socket.to(data).emit('receive-reset', data)
  })
})

server.listen(4000, () => {
  console.log('running')
})

app.get('/', (req, res) => {
  res.send('hello')
})
