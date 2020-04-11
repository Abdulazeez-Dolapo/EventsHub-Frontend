const Sequelize = require("sequelize")
const config = require("../config/config")

const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	config.db.options
)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
