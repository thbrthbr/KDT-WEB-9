const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')

const app = express()
const PORT = 8000

const server = http.createServer(app)
const io = SocketIO(server)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('client')
})

app.get('/chat', (req, res) => {
  res.render('실습78')
})

io.on('connection', (socket) => {
  console.log('조인 전', socket.rooms)
  socket.on('join', (res) => {
    //채팅방을 생성하는 방법은 join(방아이디) 사용 / 방이 존재하면 그 방으로 접속
    socket.join(res)
    socket.room = res
    console.log('조인 후', socket.rooms)
    // broadcast는 나를 제외한 전체사용자(브라우저)에게 메세지 전달
    socket.broadcast.to(res).emit('create', '새로운 브라우저가 입장하였습니다')
    const roomInfo = io.sockets.adapter.rooms.get(res)?.size
    console.log(roomInfo)
  })

  socket.on('message', (res) => {
    // io.to(특정방아이디).emit(이벤트) 특정방의 전체 사용자에게 메세지 전달
    io.to(socket.room).emit('chat', { message: res, sender: socket.id }) // 발신자 정보와 함께 메시지 전달
  })

  socket.on('leave', () => {
    socket.leave(socket.room)
    const roomInfo = io.sockets.adapter.rooms.get(socket.room)?.size
    console.log(roomInfo)
  })
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
