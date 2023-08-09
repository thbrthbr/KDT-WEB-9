import * as User from '../model/User.js'

export const getUser = (req, res) => {
  res.render('index')
}

export const getSignup = (req, res) => {
  res.render('signup')
}

export const getSignin = (req, res) => {
  res.render('signin')
}

export const postSignup = async (req, res) => {
  try {
    await User.postSignup(req.body)
    res.send({
      result: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export const postSignin = async (req, res) => {
  try {
    const rows = await User.postSignin(req.body)
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
  } catch (error) {
    console.log(error)
  }
}

export const postProfile = (req, res) => {
  res.render('profile', { data: req.body })
}

export const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.body)
    res.send({ result: true })
  } catch (error) {
    console.log(error)
  }
}

export const patchUser = async (req, res) => {
  try {
    await User.patchUser(req.body)
    res.send({ result: true })
  } catch (error) {
    console.log(error)
  }
}
