//const User = require('../model/User');
const { User } = require('../models')
const { Op } = require('sequelize')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltNumber = 10

// 암호화
const bcryptPassword = (password) => {
  let res = bcrypt.hashSync(password, saltNumber)
  console.log(res.data)
  return res
}

// 비교
const comparePassword = (password, dbPassword) => {
  let res = bcrypt.compareSync(password, dbPassword)
  console.log(res.data)
  return res
}

// const algorithm = 'aes-256-cbc' // 256비트 키를 사용, 블록크기는 128비트
// const key = crypto.randomBytes(32)
// const iv = crypto.randomBytes(16) // 초기화 벡터, 데이터블록을 암호화할 때 보안성을 높이기 위해 사용함

// 암호화
// const cipherEncrypt = (word) => {
//   const cipher = crypto.createCipheriv(algorithm, key, iv) // 암호화 객체 생성
//   let encryptedData = cipher.update(word, 'utf-8', 'base64') // 암호화할 데이터 처리
//   encryptedData += cipher.final('base64')
//   console.log(typeof encryptedData)
//   return encryptedData
// }

// 복호화
// const decipher = (encryptedData) => {
//   const decipher = crypto.createDecipheriv(algorithm, key, iv) // 복호화 객체 생성
//   let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8')
//   decryptedData += decipher.final('utf-8')
//   return decryptedData
// }

exports.index = (req, res) => {
  res.render('index')
}
exports.signup = (req, res) => {
  res.render('signup')
}
exports.signin = (req, res) => {
  res.render('signin')
}

exports.post_signup = (req, res) => {
  //model
  // User.post_signup(req.body, () => {
  //     res.send({ result: true });
  // });
  const { pw } = req.body
  let secretPw = bcryptPassword(pw)
  User.create({
    userid: req.body.userid,
    name: req.body.name,
    pw: secretPw,
  }).then((result) => {
    console.log('result', result)
    res.send({ result: true })
  })
}
exports.post_signin = (req, res) => {
  //model
  // User.post_signin(req.body, (result) => {
  //     if (result.length > 0) {
  //         res.send({ result: true, data: result[0] });
  //     } else {
  //         res.send({ result: false, data: null });
  //     }
  // });
  const { userid, pw } = req.body
  User.findOne({
    where: { userid },
  }).then((data) => {
    if (data !== null) {
      console.log('result', data)
      // comparePassword(pw, data.pw)
      // const dbpw = decipher(data.dataValues.pw)
      if (comparePassword(pw, data.pw)) {
        res.send({ result: true, data })
      } else {
        res.send({ result: false })
      }
    } else {
      res.send({ result: false })
    }
  })
}
exports.post_profile = (req, res) => {
  // User.post_profile(req.body, (result) => {
  //     if (result.length > 0) {
  //         res.render('profile', { data: result[0] });
  //     }
  // });
  const { userid } = req.body
  User.findOne({
    where: { userid },
  }).then((data) => {
    console.log('result', data)
    res.render('profile', { data })
  })
}
exports.edit_profile = (req, res) => {
  // User.edit_profile(req.body, () => {
  //     res.send({ result: true });
  // });
  const { userid, pw, name, id } = req.body
  User.update({ userid, pw, name }, { where: { id } }).then((result) => {
    console.log('update', result)
    res.send({ result: true })
  })
}
exports.delete_profile = (req, res) => {
  // User.delete_profile(req.body.id, () => {
  //     res.send({ result: true });
  // });
  const { id } = req.body
  User.destroy({ where: { id } }).then((result) => {
    console.log('destroy', result)
    res.send({ result: true })
  })
}

exports.findall = (req, res) => {
  User.findAll({
    // attributes 원하는 컬럼 조회
    // attributes: ['name', 'userid'],
    // Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.ne(같지않은)
    // Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열요소와 모두 다른)
    // where: {
    //   id: {
    //     [Op.gte]: 2,
    //   },
    // },
    order: [['id', 'DESC']],
    limit: 1,
    offset: 1,
  }).then((result) => {
    console.log('findAll', result)
    res.send(result)
  })
}
