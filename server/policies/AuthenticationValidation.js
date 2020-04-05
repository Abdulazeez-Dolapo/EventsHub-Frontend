const Joi = require("joi")

module.exports = {
	register(req, res, next) {
		const schema = {
			user_id: Joi.string(),
			first_name: Joi.string(),
			last_name: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
		}

		const { error, value } = Joi.validate(req.body, schema)
		if (error) {
			switch (error.details[0].context.key) {
				case "user_id":
					res.status(400).send({
						error: "Invalid user id",
					})
					break
				case "first_name":
					res.status(400).send({
						error: "Invalid first name",
					})
					break
				case "last_name":
					res.status(400).send({
						error: "Invalid Last Name",
					})
					break
				case "email":
					res.status(400).send({
						error: "Please enter a valid email address",
					})
					break
				case "password":
					res.status(400).send({
						error:
							"Password must be between 8 and 32 characters long and should contain only letters and numbers",
					})
					break

				default:
					res.status(400).send({
						error: "Invalid registration details",
					})
					break
			}
		} else {
			next()
		}
	},

	login(req, res, next) {
		const schema = {
			email: Joi.string().email(),
			password: Joi.string(),
		}

		const { error, value } = Joi.validate(req.body, schema)
		if (error) {
			switch (error.details[0].context.key) {
				case "email":
					res.status(400).send({
						error: "Please enter a valid email address",
					})
					break
				case "password":
					res.status(400).send({
						error: "Invalid password",
					})
					break

				default:
					res.status(400).send({
						error: "Invalid login details",
					})
					break
			}
		} else {
			next()
		}
	},
}
