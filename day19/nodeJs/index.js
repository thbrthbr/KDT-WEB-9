// const { b } = require('./module')

// console.log(b)

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  try {
    const data = fs.readFileSync('./index.html')
    res.writeHead(200)
    res.end(data)
    // res.writeHead(200)
    // res.write('<h1>hello world</h1>')
    // res.end('<p>end</p>')
  } catch (error) {
    console.log(error)
    res.writeHead(404)
    res.end(error.message)
  }
})

server.on('request', () => {
  console.log('request 이벤트')
})
server.on('connection', () => {
  console.log('connection 이벤트')
})
server.listen(8080, () => {
  console.log('8080번 포트로 실행')
})
