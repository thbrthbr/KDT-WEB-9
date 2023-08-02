const express = require('express')
const app = express()
const PORT = 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('실습64')
})

app.get('/axios', (req, res) => {
  console.log('back', req.query)
  res.send(req.query)
})

app.post('/axios', (req, res) => {
  console.log('back', req.body)
  res.send(req.body)
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
