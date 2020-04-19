import EventService from "@/services/EventService"

export const namespaced = true

export const actions = {
	async markAttendance({ rootState, dispatch }, info) {
		try {
			const response = await EventService.markAttendance(info)

			const eventData = {
				number: response.data.number,
				id: info.event_id,
			}

			const event = await EventService.updateEventAttendance(eventData)
			dispatch("event/getEventMutation", event.data.data, { root: true })

			const eventResponse = await EventService.getUserEvents(
				rootState.user.user.user_id
			)
			let userEvents = eventResponse.data.data
			dispatch("event/setUserEvents", userEvents, { root: true })
			dispatch("setMessage", response.data.message, { root: true })
		} catch (error) {
			console.log(error)
			dispatch("setMessage", error, { root: true })
		}
	},

	async cancelAttendance({ rootState, dispatch }, eventData) {
		try {
			const response = await EventService.cancelAttendance(eventData)

			const info = {
				number: response.data.number,
				id: eventData.event_id,
			}
			const event = await EventService.updateEventAttendance(info)
			dispatch("event/getEventMutation", event.data.data, { root: true })

			const newArray = rootState.event.userEvents.filter(element => {
				if (element.event_id != rootState.event.newEvent.event_id) {
					return element
				}
			})
			dispatch("event/setUserEvents", newArray, { root: true })
		} catch (error) {
			console.log(error)
			dispatch("setMessage", error, { root: true })
		}
	},
}
