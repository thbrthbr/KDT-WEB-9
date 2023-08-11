const express = require('express')
const app = express()
const PORT = 8000
const db = require('./models')

app.set('view engine', 'ejs')
// app.set('views', './views')
// node.js는 기본적으로 view라는 폴더에서 가져오기 때문에 생략 가능
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

const studentRouter = require('./routes/student')
app.use('/student', studentRouter)

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
})
