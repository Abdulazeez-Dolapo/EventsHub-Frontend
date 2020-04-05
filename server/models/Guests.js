const Sequelize = require("sequelize")
const db = require("./database")

module.exports = db.sequelize.define("guests", {
	event_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	event_title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	organiser_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	guest_first_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	guest_last_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	guest_user_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
})
