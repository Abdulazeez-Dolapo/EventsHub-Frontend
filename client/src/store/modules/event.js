import router from "@/router"
import EventService from "@/services/EventService"

export const namespaced = true

export const state = {
	newEvent: null,
	allEvents: null,
	searchedEvents: [],
	userEvents: null,
	userCreatedEvents: null,
}

export const mutations = {
	SET_ALL_EVENTS(state, value) {
		state.allEvents = value
	},
	SET_USER_EVENTS(state, value) {
		state.userEvents = value
	},
	SET_USER_CREATED_EVENTS(state, value) {
		state.userCreatedEvents = value
	},
	GET_EVENT(state, event) {
		state.newEvent = event
	},
	SEARCHED_EVENTS(state, events) {
		state.searchedEvents = events
	},
}

export const actions = {
	setUserEvents({ commit }, events) {
		commit("SET_USER_EVENTS", events)
	},

	setUserCreatedEvents({ commit }, events) {
		commit("SET_USER_CREATED_EVENTS", events)
	},

	getEventMutation({ commit }, event) {
		commit("GET_EVENT", event)
	},

	async getUserCreatedEvents({ rootState, commit }) {
		try {
			const userCreatedEvents = await EventService.getUserCreatedEvents(
				rootState.user.user.user_id
			)
			commit("SET_USER_CREATED_EVENTS", userCreatedEvents.data.userEvents)
		} catch (error) {
			console.log(error)
		}
	},

	async getUserEvents({ rootState, commit }) {
		try {
			const eventResponse = await EventService.getUserEvents(
				rootState.user.user.user_id
			)
			commit("SET_USER_EVENTS", eventResponse.data.data)
		} catch (error) {
			console.log(error)
		}
	},

	searchedEvents({ commit }, events) {
		commit("SEARCHED_EVENTS", events)
	},

	async createEvent({ dispatch }, event) {
		try {
			const response = await EventService.createEvent(event)
			const id = response.data.event.event_id
			dispatch("setMessage", response.data.message, { root: true })
			router.push(`/event/${id}`)
		} catch (error) {
			dispatch("setMessage", error.response.data.error, { root: true })
		}
	},

	async getEvents({ commit }) {
		try {
			const response = await EventService.getEvents()
			commit("SET_ALL_EVENTS", response.data.events)
			return response.data.events
		} catch (error) {
			console.log(error)
			dispatch("setMessage", error.response.data.error, { root: true })
		}
	},

	async getEvent({ state }, id) {
		const response = await EventService.getEvent(id)
		return response.data.event
	},

	async editEvent({ dispatch }, data) {
		try {
			const response = await EventService.updateEvent(data)
			dispatch("setMessage", response.data.message, { root: true })
			router.push({ name: "Profile" })
		} catch (error) {
			console.log(error)
		}
	},

	async deleteEvent({ dispatch }, data) {
		try {
			const response = await EventService.deleteEvent(data)
			dispatch("setMessage", response.data.message, { root: true })
			router.push({ name: "Profile" })
		} catch (error) {
			console.log(error)
		}
	},
}
