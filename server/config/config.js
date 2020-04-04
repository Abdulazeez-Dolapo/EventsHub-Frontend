module.exports = {
	port: process.env.PORT || 5000,
	db: {
		database: process.env.DB_NAME || "event_management_system",
		user: process.env.DB_USER || "test",
		password: process.env.DB_PASS || "P@ssw0rd",
		options: {
			dialect: process.env.DIALECT || "mysql",
			host: process.env.HOST || "localhost",
			storage: "./event_mgt.sql",
		},
	},
	jwt: {
		secret: process.env.JWT_SECRET || "secret",
	},
}
