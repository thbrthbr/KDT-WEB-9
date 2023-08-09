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

db.Visitor = require('./Visitor')(sequelize, Sequelize)
// const a = require("./Visitor")

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
