const User = require("../../models/Users")
const jwt = require("jsonwebtoken")
const config = require("../../config/config")
const bcrypt = require("bcrypt")

function generateToken(user) {
	const expire = 60 * 60 * 24
	return jwt.sign(user, config.jwt.secret, {
		expiresIn: expire,
	})
}

module.exports = {
	async register(req, res) {
		try {
			let pwd = req.body.password
			req.body.password = bcrypt.hashSync(pwd, 10)

			const user = await User.create(req.body)
			const userJson = user.toJSON()
			const payload = {
				name: userJson.first_name,
				user_id: userJson.user_id,
			}

			res.status(200).json({
				token: generateToken(payload),
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "This email is already in use",
			})
		}
	},

	async login(req, res) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({
				where: {
					email: email,
				},
			})

			if (!user) {
				return res.status(403).send({
					error: "Invalid login details",
				})
			}

			const checkPassword = bcrypt.compareSync(password, user.password)
			if (!checkPassword) {
				return res.status(403).send({
					error: "Invalid login details",
				})
			}

			const userJson = user.toJSON()
			let userData = {
				user_id: userJson.user_id,
				last_name: userJson.last_name,
				first_name: userJson.first_name,
				email: userJson.email,
			}

			res.send({
				user: userData,
				token: generateToken(userData),
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({
				error: "An error occured while trying to login",
			})
		}
	},
}
