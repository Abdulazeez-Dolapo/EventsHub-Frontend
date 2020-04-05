const Sequelize = require("sequelize")
const db = require("./database")

module.exports = db.sequelize.define("events", {
	event_id: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	organiser_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	organiser_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	time: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	date: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	max_guests: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	number_attending: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
})
