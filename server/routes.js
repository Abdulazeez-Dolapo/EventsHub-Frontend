const Authentication = require("./controllers/registration/Authentication")
const AuthenticationValidation = require("./policies/AuthenticationValidation")

const Event = require("./controllers/events/Events")
const Guest = require("./controllers/events/Guest")

module.exports = app => {
	app.post(
		"/register",
		// AuthenticationValidation.register,
		Authentication.register
	)

	app.post(
		"/login",
		// AuthenticationValidation.login,
		Authentication.login
	)

	app.post("/create-event", Event.addEvent)

	app.get("/get-events", Event.getEvents)

	app.get("/get-event/:id", Event.getEvent)

	app.post("/update-event", Event.updateEvent)

	app.post("/mark-attendance", Guest.markAttendance)

	// app.get("/get-guests/:id", Guest.getGuests)
}
