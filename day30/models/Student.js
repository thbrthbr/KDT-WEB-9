const { DataTypes } = require('sequelize')

const studentModel = (sequelize) => {
  const Student = sequelize.define('student', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.STRING(31),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: DataTypes.STRING(63),
  })
  return Student
}

module.exports = studentModel
