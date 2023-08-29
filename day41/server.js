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
  res.render('chat')
})

io.on('connection', (socket) => {
  //   socket.on('open_message', (arg, cb) => {
  //     console.log(arg)
  //     cb(arg)
  //   })

  //   socket.on('form_message', (arg) => {
  //     console.log(arg)
  //     // io.emit('backend_message', arg) // 전체브라우저
  //     socket.emit('backend_message', arg) // 전체브라우저
  //   })

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
    console.log(res)
    console.log(socket.id)
    // io.to(특정방아이디).emit(이벤트) //특정방의 전체 사용자에게 메세지 전달
    const roomInfo = io.sockets.adapter.rooms.get(socket.room)
    // console.log('이건데', roomInfo)
    // console.log('확인', socket.rooms)
    // console.log('또확인', socket.room)
    io.to(socket.room).emit('chat', res)
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
