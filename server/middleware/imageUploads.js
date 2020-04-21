const multer = require("multer")

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname)
	},
	destination: (req, file, cb) => {
		cb(null, "./uploads")
	},
})

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/png"
	) {
		cb(null, true)
	} else {
		cb(new Error("File type not accepted"), false)
	}
}

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter,
})

module.exports = upload
