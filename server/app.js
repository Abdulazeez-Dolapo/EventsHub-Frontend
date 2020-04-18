require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const { sequelize } = require("./models/database")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(morgan("combined"))
app.use("/uploads", express.static("uploads"))

require("./routes")(app)

sequelize.sync().then(() => {
	app.listen(process.env.PORT)
	console.log(`Server started on port ${process.env.PORT}`)
})
