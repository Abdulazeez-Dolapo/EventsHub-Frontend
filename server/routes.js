const Authentication = require("./controllers/registration/Authentication")
const AuthenticationValidation = require("./policies/AuthenticationValidation")
const Authorise = require("./middleware/authentication")
const upload = require("./middleware/imageUploads")

const Event = require("./controllers/events/Events")
const Guest = require("./controllers/events/Guest")

module.exports = app => {
	app.post(
		"/register",
		AuthenticationValidation.register,
		upload.single("profile_picture"),
		Authentication.register
	)

	app.post("/login", AuthenticationValidation.login, Authentication.login)

	app.get("/confirm/:token", Authentication.confirmEmail)

	app.post("/create-event", Authorise, Event.addEvent)

	app.get("/get-events", Event.getEvents)

	app.get("/get-event/:id", Event.getEvent)

	app.post("/update-event-attendance", Authorise, Event.updateEventAttendance)

	app.post("/update-event", Authorise, Event.updateEvent)

	app.delete("/delete-event/:id", Authorise, Event.deleteEvent)

	app.get(
		"/get-user-created-events/:user_id",
		Authorise,
		Event.getUserCreatedEvents
	)

	app.post("/mark-attendance", Authorise, Guest.markAttendance)

	app.post("/cancel-attendance", Authorise, Guest.cancelAttendance)

	app.get("/get-user-events/:id", Authorise, Guest.getUserEvents)
}
