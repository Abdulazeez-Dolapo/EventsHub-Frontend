const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
	service: "gmail",
	secure: false,
	port: 25,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

module.exports = transporter
