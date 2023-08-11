const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  session({
    secret: 'mySessionSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  }),
)

app.get('/', (req, res) => {
  if (req.session.name !== undefined) {
    res.render('실습70-2', { data: req.session.name })
  } else {
    res.render('실습70')
  }
})

app.post('/login', (req, res) => {
  if (req.body.id == 'id1' && req.body.pw == 1234) {
    req.session.name = req.body.id
    console.log(req.session)
    res.send({ result: true })
  } else {
    res.send({ result: false })
  }
})

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(req.session)
    res.clearCookie('connect.sid')
    res.send({ result: true })
  })
})

app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`)
})
