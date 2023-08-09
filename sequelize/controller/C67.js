const User = require('../model/M67')

exports.main = (req, res) => {
  res.render('실습67')
}

exports.axiosPost = (req, res) => {
  console.log('back', req.body)
  const id = User.idpw()[0].id
  const pw = User.idpw()[0].pw
  if (req.body.logid === id && req.body.logpw == pw) {
    res.send({ result: '성공' })
  } else {
    res.send({ result: '실패' })
  }
}
