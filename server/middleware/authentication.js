const jwt = require("jsonwebtoken")
const config = require("../config/config")

module.exports = (req, res, next) => {
	try {
		const header = req.headers.authorization
		const [, token] = header.split(" ")
		jwt.verify(token, config.jwt.secret)
		next()
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			message: "Authorization failed",
		})
	}
}
