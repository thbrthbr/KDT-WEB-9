const express = require('express')
const app = express()
const PORT = 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  //   console.log(req.body)
  res.render('실습62', { title: '폼 전송 실습' })
})

app.get('/getForm62', (req, res) => {
  console.log(req.query)
  res.render('실습62-2', {
    title: 'GET요청 폼 결과 확인하기',
    userInfo: req.query,
  })
})
app.post('/postForm', (req, res) => {
  console.log(req.body)
  res.render('result', {
    title: 'POST요청 폼 결과 확인하기',
    userInfo: req.body,
  })
})

app.post('/', (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
