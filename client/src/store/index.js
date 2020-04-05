import Vue from "vue"
import Vuex from "vuex"
import router from "../router"
import AuthenticationService from "../services/AuthenticationService"
import EventService from "../services/EventService"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		routeMessage: null,
		newEvent: null,
		user: null,
		token: null,
		logInStatus: false,
		message: "",
		categories: [
			"Wedding",
			"Anniversary",
			"Birthday",
			"Graduation",
			"Convocation",
			"hackathon",
			"Meeting",
			"Conference",
		],
	},
	mutations: {
		SET_USER(state, userInfo) {
			state.user = userInfo.user
			state.token = userInfo.token
			if (state.token) {
				state.logInStatus = true
			} else {
				state.logInStatus = false
			}
		},
		LOG_OUT(state) {
			state.user = null
			state.token = null
			state.logInStatus = false
		},
		RESET_STATE(state) {
			state.user = []
			state.message = null
			state.token = null
			state.logInStatus = false
		},
		SET_MESSAGE(state, message) {
			state.message = message
		},
		GET_EVENT(state, event) {
			state.newEvent = event
		},
	},
	actions: {
		async register({ state, commit }, userInfo) {
			try {
				const response = await AuthenticationService.register(userInfo)
				console.log(response)
				commit("SET_USER", response.data)
				state.message = response.data.message
				router.push({ name: "Home" })
			} catch (error) {
				state.message = error.response.data.error
			}
		},

		async login({ state, commit }, userInfo) {
			try {
				const response = await AuthenticationService.login(userInfo)
				commit("SET_USER", response.data)
				state.message = response.data.message
				router.push({ name: "Home" })
			} catch (error) {
				state.message = error.response.data.error
			}
		},

		logout({ commit }) {
			commit("LOG_OUT")
		},

		reset({ commit }) {
			commit("RESET_STATE")
		},

		async createEvent({ state, commit }, event) {
			try {
				const response = await EventService.createEvent(event)
				state.message = response.data.event.message
			} catch (error) {
				state.message = error.response.data.error
			}
		},

		async getEvents({ state }) {
			try {
				const response = await EventService.getEvents()
				return response.data.events
			} catch (error) {
				console.log(error)
				state.message = error.response.data.error
			}
		},

		async getEvent({ state }, id) {
			try {
				const response = await EventService.getEvent(id)
				return response.data.event
			} catch (error) {
				console.log(error)
				state.message = error.response.data.error
			}
		},

		async markAttendance({ state, commit }, info) {
			try {
				const response = await EventService.markAttendance(info)

				const eventData = {
					number: response.data.number,
					id: info.event_id,
				}
				const event = await EventService.updateEvent(eventData)
				commit("GET_EVENT", event.data.data)
			} catch (error) {
				console.log(error)
				commit("SET_MESSAGE", error)
			}
		},
	},
	getters: {},
	modules: {},
})
