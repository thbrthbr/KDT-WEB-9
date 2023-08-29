const ws = require('ws')
const express = require('express')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('실습76')
})

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

let db = {
  A: 0,
  B: 0,
}

// 웹소켓 서버 접속
const wss = new ws.Server({ server })

// 브라우저(클라이언트)들을 담을 배열변수
const sockets = []
// socket 변수는 접속한 브라우저
wss.on('connection', (socket) => {
  console.log('클라이언트가 연결되었습니다')
  console.log(JSON.stringify(db))

  //   socket.send(`${JSON.stringify(db)}`)

  // sockets배열에 브라우저 정보 추가
  sockets.push(socket)
  // 메시지 이벤트
  socket.on('message', (message) => {
    // 웹소켓을 통해 클라이언트와 서버간의 데이터를 주고받을 때는 일반적으로 문자열 또는 버퍼형태로 전달됨
    // 서버가 모두 다른 환경이기 때문에 객체를 전달할 때는 객체를 일련의 바이트로 변환하는 직렬화 과정이 필요
    // socket.send(`서버메세지: ${message}`)
    let data = JSON.parse(message)
    if (data.type == 1) {
      db.A++
      sockets.forEach((elem) => {
        elem.send(`${message.toString('utf-8')}`)
      })
    } else if (data.type == 2) {
      db.B++
      sockets.forEach((elem) => {
        elem.send(`${message.toString('utf-8')}`)
      })
    } else {
      socket.send(JSON.stringify(db))
      sockets.forEach((elem) => {
        elem.send(JSON.stringify(db))
      })
    }
    console.log(db)
  })

  // 오류 이벤트
  socket.on('error', (err) => {
    console.log('에러가 발생하였습니다', err)
  })

  // 접속종료 이벤트
  socket.on('close', () => {
    console.log('클라이언트와 연결이 종료되었습니다')
  })
})
