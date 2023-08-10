const express = require('express')
const app = express()
const PORT = 8000
const db = require('./models')

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const visitorRouter = require('./routes/visitor')

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/visitor', visitorRouter)

app.use('*', (req, res) => {
  res.render('404')
})

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost${PORT}`)
  })
})
