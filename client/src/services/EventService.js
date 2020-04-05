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
	updateEvent(event) {
		return Api().post("update-event", event)
	},

	markAttendance(info) {
		return Api().post("mark-attendance", info)
	},
}
