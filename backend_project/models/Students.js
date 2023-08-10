const { DataTypes } = require('sequelize')

const studentModel = (sequelize) => {
  const Student = sequelize.define('student', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    major: {
      type: DataTypes.STRING(31),
      allowNull: false,
    },
  })
  return Student
}

module.exports = studentModel
