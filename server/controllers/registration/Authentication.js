const User = require("../../models/Users")
const jwt = require("jsonwebtoken")
const config = require("../../config/config")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

// async function createAccount() {
// 	let account = await nodemailer.createTestAccount()
// 	return account
// }

// const testAccount = createAccount()
// console.log(testAccount)

// let transporter = nodemailer.createTransport({
// 	host: "smtp.ethereal.email",
// 	port: 587,
// 	secure: false,
// 	auth: {
// 		user: testAccount.user,
// 		pass: testAccount.pass,
// 	},
// })

function generateToken(user) {
	const expire = 60 * 60 * 24
	return jwt.sign(user, config.jwt.secret, {
		expiresIn: expire,
	})
}

module.exports = {
	async register(req, res) {
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

				const user = await User.create(req.body)
				const userJson = user.toJSON()
				const payload = {
					name: userJson.first_name,
					user_id: userJson.user_id,
				}

				const token = generateToken(payload)
				const url = `http://localhost:8080/confirmation/${token}`

				let testAccount = await nodemailer.createTestAccount()
				console.log(testAccount)

				let transporter = nodemailer.createTransport({
					sendMail: true,
					host: "smtp.ethereal.email",
					port: 587,
					secure: false,
					auth: {
						user: testAccount.user,
						pass: testAccount.pass,
					},
					debug: true,
					logger: true,
				})

				// let transporter = nodemailer.createTransport({
				// 	service: "gmail",
				// 	secure: false,
				// 	port: 25,
				// 	auth: {
				// 		user: process.env.EMAIL,
				// 		pass: process.env.PASSWORD,
				// 	},
				// 	tls: {
				// 		rejectUnauthorized: false,
				// 	},
				// })

				const HelperOptions = {
					from: "'Azeez Dolapo' <azeezdolapotest@gmail.com>",
					to: req.body.email,
					subject: "EventsHub account confirmation",
					// text: `Hello`,
					html: `Please click this link to confirm your account with us: <a href="${url}">${url}</a>`,
				}

				let info = await transporter.sendMail(HelperOptions)
				console.log(info)

				res.status(200).json({
					message:
						"Please check your email for a confirmation link before proceeding",
				})
			}
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "There was an error creating your account",
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

			if (!user.confirmed) {
				return res.status(403).send({
					error: "Please confirm your email before proceeding",
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
