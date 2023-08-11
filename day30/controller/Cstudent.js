const { Student, StudentProfile, Classes } = require('../models')

exports.main = (req, res) => {
  res.render('index')
}

exports.post_student = async (req, res) => {
  try {
    const { userid, password, email, name, major } = req.body
    const user = await Student.create(
      {
        userid,
        password,
        email,
        studentProfile: {
          name,
          major,
        },
      },
      {
        include: StudentProfile,
        //[{model: StudentProfile}]
      },
    )
    console.log(user)
    res.send(user)
  } catch (err) {
    console.log(err)
  }
}
exports.post_class = async (req, res) => {
  try {
    const { name, room, code, teacher_name, studentId } = req.body
    const classes = await Classes.create({
      name,
      room,
      code,
      teacher_name,
      studentId,
    })
    res.send(classes)
  } catch (err) {
    console.log(err)
  }
}

exports.get_student = async (req, res) => {
  try {
    // include: 쿼리를 실행할 때 관련된 모델의 데이터로 함께
    // 조회할 수 있도록 하는 옵션
    const student = await Student.findAll({
      attributes: ['id', 'userid', 'email'],
      include: [{ model: StudentProfile, attributes: ['major', 'name'] }],
    })
    res.send(student)
  } catch (err) {
    console.log(err)
  }
}
