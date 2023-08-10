'use strict'

const Sequelize = require('sequelize')
const config = require(__dirname + '/../config/config.json')['development']
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)

//모델

db.Student = require('./Students')(sequelize)
db.Classes = require('./Classes')(sequelize)

//관계형성

db.Student.hasMany(db.Classes, { foreignKey: 'student_id' })
db.Classes.belongsTo(db.Student, { foreignKey: 'student_id' })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
