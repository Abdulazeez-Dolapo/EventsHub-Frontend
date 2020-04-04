const Authentication = require("./controllers/registration/Authentication")
const AuthenticationValidation = require("./policies/AuthenticationValidation")

module.exports = app => {
	app.post(
		"/register",
		AuthenticationValidation.register,
		Authentication.register
	)

	// app.post("/login", Authentication.login)
	app.post("/login", AuthenticationValidation.login, Authentication.login)
}
