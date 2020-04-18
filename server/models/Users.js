const Sequelize = require("sequelize")
const db = require("./database")

module.exports = db.sequelize.define("users", {
	user_id: {
		type: Sequelize.STRING,
		unique: true,
	},
	first_name: {
		type: Sequelize.STRING,
	},
	last_name: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
	},
	profile_picture: {
		type: Sequelize.STRING,
	},
	confirmed: {
		type: Sequelize.TINYINT,
		defaultValue: false,
	},
})
