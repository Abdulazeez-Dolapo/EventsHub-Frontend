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
})

// module.exports = (sequelize, DataTypes) =>
// 	sequelize.define("users", {
// 		userId: {
// 			type: DataTypes.STRING,
// 			unique: true,
// 		},
// 		first_name: {
// 			type: DataTypes.STRING,
// 		},
// 		last_name: {
// 			type: DataTypes.STRING,
// 		},
// 		email: {
// 			type: DataTypes.STRING,
// 			unique: true,
// 		},
// 		password: {
// 			type: DataTypes.STRING,
// 		},
// 	})
