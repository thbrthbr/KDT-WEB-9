const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'news',
  password: '1234',
  database: 'kdt9',
  port: 3306,
})

conn.connect((err) => {
  if (err) {
    console.log('error: ', err)
    return
  }
  console.log('connect')
})

exports.postSignup = (data, callback) => {
  const query = `INSERT INTO login (userid, pw, name) VALUES ('${data.id}', '${data.pw}', '${data.name}')`
  conn.query(query, (err, rows) => {
    if (err) {
      console.log('error: ', err)
      return
    }
    console.log('rows', rows)
    callback(rows)
  })
}

exports.postSignin = (data, callback) => {
  const query = `SELECT * FROM login WHERE userid = '${data.id}' and pw = '${data.pw}'`
  console.log(query)
  conn.query(query, (err, rows) => {
    if (err) {
      console.log('error: ', err)
      return
    }
    console.log('rows', rows)
    callback(rows)
  })
}

exports.deleteUser = (data, callback) => {
  console.log(data.id)
  const query = `DELETE FROM login WHERE userid='${data.id}'`
  conn.query(query, (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
    callback()
  })
}

exports.patchUser = (data, callback) => {
  console.log(data.id)
  const query = `UPDATE login SET userid='${data.id}' WHERE userid='${data.befId}'`
  conn.query(query, (err, rows) => {
    console.log('rows', rows)
    if (err) {
      console.log(err)
      return
    }
    callback()
  })
}
