const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
	service: "gmail",
	secure: false,
	port: 25,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

let HelperOptions = {
	from: "'Azeez Dolapo' <azeezdolapotest@gmail.com",
	to: req.body.email,
	subject: "confirmation email",
	html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
}

transporter.sendMail(HelperOptions, (err, info) => {
	if (err) {
		console.log(error)
	}
	console.log(info)
})
