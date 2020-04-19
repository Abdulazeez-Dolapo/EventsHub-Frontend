const jwt = require("jsonwebtoken")
const User = require("../../models/Users")
const bcrypt = require("bcrypt")
const config = require("../../config/config")
const transporter = require("./transporter")

function generateToken(user) {
	const expire = 60 * 60 * 24
	return jwt.sign(user, config.jwt.secret, {
		expiresIn: expire,
	})
}

module.exports = {
	async register(req, res) {
		console.log(req.body)
		try {
			const user = await User.findOne({
				where: {
					email: req.body.email,
				},
			})
			if (!!user) {
				return res.status(401).send({
					error: "Email already in use",
				})
			} else {
				let pwd = req.body.password
				req.body.password = bcrypt.hashSync(pwd, 10)

				const info = {
					user_id: req.body.user_id,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password,
					profile_picture: req.file.path,
				}

				const user = await User.create(info)
				const userJson = user.toJSON()
				const payload = {
					name: userJson.first_name,
					user_id: userJson.user_id,
				}

				const token = generateToken(payload)

				// res.status(200).send({ token })
				const url = `http://localhost:8080/confirmation/${token}`

				const HelperOptions = {
					from: "Azeez Dolapo <azeezdolapotest@gmail.com>",
					to: req.body.email,
					subject: "EventsHub account confirmation",
					html: `Please click this link to confirm your account with us: <a href="${url}">${url}</a>`,
				}

				transporter
					.sendMail(HelperOptions)
					.then(info => {
						res.status(200).json({
							message: `Welcome ${userJson.first_name}! Please check your email and click the confirmation link before proceeding`,
						})
						console.log(info)
						return
					})
					.catch(err => {
						User.destroy({
							where: {
								user_id: userJson.user_id,
							},
						})
						res.status(400).send({
							error:
								"There was an error creating your account. Please try again.",
						})
						console.log(err)
						return
					})
			}
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error:
					"There was an error creating your account. Please try again.",
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
			if (checkPassword) {
				if (!user.confirmed) {
					return res.status(403).send({
						error: "Please confirm your email before proceeding",
					})
				}
			} else {
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
				profile_picture: userJson.profile_picture,
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
	async confirmEmail(req, res) {
		try {
			const decoded = jwt.verify(req.params.token, config.jwt.secret)
			const response = await User.update(
				{
					confirmed: true,
				},
				{
					where: {
						user_id: decoded.user_id,
					},
				}
			)
			res.send({
				response,
			})
		} catch (error) {
			console.log(error)
			res.status(500).send({
				error: "An error occured while trying to confirm your email",
			})
		}
	},
}
