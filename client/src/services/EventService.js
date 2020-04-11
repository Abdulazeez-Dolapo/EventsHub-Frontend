import Api from "@/services/Api"

export default {
	createEvent(eventData) {
		return Api().post("create-event", eventData)
	},
	getEvents() {
		return Api().get("get-events")
	},
	getEvent(id) {
		return Api().get(`get-event/${id}`)
	},
	updateEventAttendance(event) {
		return Api().post("update-event-attendance", event)
	},
	updateEvent(event) {
		return Api().post("update-event", event)
	},
	getUserEvents(id) {
		return Api().get(`get-user-events/${id}`)
	},
	getUserCreatedEvents(user_id) {
		return Api().get(`get-user-created-events/${user_id}`)
	},

	markAttendance(info) {
		return Api().post("mark-attendance", info)
	},

	cancelAttendance(info) {
		return Api().post("cancel-attendance", info)
	},
}
