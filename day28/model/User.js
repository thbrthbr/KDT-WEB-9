import mysql from 'mysql2/promise'

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'news',
//   password: '1234',
//   database: 'kdt9',
//   port: 3306,
// })
// createConnection: 단일연결, 매번 연결이 필요할 때마다 새로운 연결 생성
// 연결 수가 많아지면 성능에 영향이 생김

const conn = mysql.createPool({
  host: 'localhost',
  user: 'news',
  password: '1234',
  database: 'kdt9',
  port: 3306,
})
// createPool: 여러연결, 여러개의 연결을 미리 생성하고 관리
// 요청이 들어올 때마다 생성한 연결을 할당, 동시처리 가능

export const postSignup = async (data) => {
  try {
    const query = 'INSERT INTO login (userid, pw, name) VALUES (?, ?, ?)'
    await conn.query(query, [data.id, data.pw, data.name])
  } catch (error) {
    console.log(error)
  }
}

export const postSignin = async (data) => {
  try {
    const query = 'SELECT * FROM login WHERE userid = ? AND pw = ?'
    const [rows] = await conn.query(query, [data.id, data.pw])
    console.log(rows)
    return rows
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (data, callback) => {
  try {
    const query = 'DELETE FROM login WHERE userid=?'
    await conn.query(query, [data.id])
  } catch (error) {
    console.log(error)
  }
}

export const patchUser = async (data) => {
  try {
    const query = 'UPDATE login SET userid=?, name=?, pw=? WHERE userid=?'
    const [rows] = await conn.query(query, [
      data.id,
      data.name,
      data.pw,
      data.befId,
    ])
    return rows
  } catch (error) {
    console.log(error)
  }
}
