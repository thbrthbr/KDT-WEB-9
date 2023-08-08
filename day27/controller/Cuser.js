const User = require('../model/User')

// exports.main = (req, res) => {
//   res.render('index')
// }

exports.getUser = (req, res) => {
  res.render('index')
}

exports.getSignup = (req, res) => {
  res.render('signup')
}

exports.postSignup = (req, res) => {
  User.postSignup(req.body, (rows) => {
    res.send({
      result: true,
    })
  })
}

exports.getSignin = (req, res) => {
  res.render('signin')
}

exports.postSignin = (req, res) => {
  User.postSignin(req.body, (rows) => {
    if (rows.length !== 0) {
      res.send({
        result: true,
        name: rows[0].name,
        id: rows[0].userid,
        pw: rows[0].pw,
      })
    } else {
      res.send({
        result: false,
      })
    }
  })
}

exports.postProfile = (req, res) => {
  console.log('여기임', req.body)
  res.render('profile', { data: req.body })
}

exports.deleteUser = (req, res) => {
  User.deleteUser(req.body, () => {
    res.send({ result: true })
  })
}

exports.patchUser = (req, res) => {
  User.patchUser(req.body, () => {
    res.send({ result: true })
  })
}
