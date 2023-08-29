const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')

const app = express()
const PORT = 8000

const server = http.createServer(app)
const io = SocketIO(server)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('실습77')
})

const sockets = []

io.on('connection', (socket) => {
  socket.on('open_message', (arg, cb) => {
    console.log(arg)
    cb(arg)
  })

  socket.on('type', (arg) => {
    console.log('client: ', arg.type)
    // io.emit('backend_message', arg) // 전체브라우저
    socket.emit('backend_message', arg)
  })
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
