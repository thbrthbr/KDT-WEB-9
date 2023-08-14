const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const secret = 'secretKey'

const userInfo = { id: 'kdt9', pw: '1234', name: '홍길동' }

app.get('/', (req, res) => {
  res.render('실습70')
})

app.get('/login', (req, res) => {
  res.render('실습70-2')
})

app.get('/token', (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')
    try {
      const result = jwt.verify(token[1], secret)
      if (result.id === userInfo.id) {
        res.json({ result: true, name: userInfo.name })
      }
    } catch (err) {
      console.log(err)
      res.json({ result: false, message: '인증된 회원이 아닙니다' })
    }
  } else {
    res.redirect('/login')
    //실습70-2
  }
})

app.post('/login', (req, res) => {
  try {
    const { id, pw } = req.body
    const { id: uId, pw: uPw } = userInfo
    //id와 pw를 각각 uId와 uPw로 할당
    if (id === uId && pw == uPw) {
      const token = jwt.sign({ id }, secret)
      res.json({ result: true, token })
    } else {
      res.json({ result: false, message: '꺼져' })
    }
  } catch (err) {
    console.log(err)
  }
})

// app.post('/login', (req, res) => {
//   const { id, pw } = req.body
//   const token = jwt.sign({ id }, secret)
//   console.log(token)

//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       return res.status(403).send({ message: '검증 실패' })
//     }
//     console.log(decoded)
//     res.send({ result: true, data: decoded.id })
//   })
// })

// app.post('/2', (req, res) => {
//   res.render('실습70-2', { data: req.body })
// })

// app.post('/logout', (req, res) => {
//   res.send({ result: true })
// })

app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`)
})
