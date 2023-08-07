const express = require('express')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const router = require('./routes/index')
// const router = require('./routes')
// 참고하는 파일의 이름이 index.js면 / 뒤에 아무것도 안 써도 무방

app.use('/', router)

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`)
})
