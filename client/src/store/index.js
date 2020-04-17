import Vue from "vue"
import Vuex from "vuex"
import router from "../router"
import AuthenticationService from "../services/AuthenticationService"
import EventService from "../services/EventService"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		savedPage: null,
		savedStart: null,
		savedEnd: null,
		routeMessage: null,
		newEvent: null,
		user: null,
		logInStatus: false,
		message: "",
		allEvents: null,
		searchedEvents: [],
		userEvents: null,
		userCreatedEvents: null,
		displayNotification: false,
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
			if (userInfo.token) {
				state.logInStatus = true
			} else {
				state.logInStatus = false
			}
		},
		SET_ALL_EVENTS(state, value) {
			state.allEvents = value
		},
		SET_USER_EVENTS(state, value) {
			state.userEvents = value
		},
		SET_USER_CREATED_EVENTS(state, value) {
			state.userCreatedEvents = value
		},
		LOG_OUT(state) {
			state.user = null
			state.logInStatus = false
			state.message = null
			state.userEvents = null
			state.userCreatedEvents = null
		},
		SET_MESSAGE(state, message) {
			if (message) {
				state.message = message
				state.displayNotification = true
			} else {
				state.message = null
				state.displayNotification = false
			}
		},
		GET_EVENT(state, event) {
			state.newEvent = event
		},
		SEARCHED_EVENTS(state, events) {
			state.searchedEvents = events
		},
		SET_PAGE_INFO(state, info) {
			if (info) {
				state.savedEnd = info.end
				state.savedStart = info.start
				state.savedPage = info.page
			} else {
				state.savedEnd = null
				state.savedStart = null
				state.savedPage = null
			}
		},
	},
	actions: {
		async register({ state, commit }, userInfo) {
			try {
				const response = await AuthenticationService.register(userInfo)
				state.message = response.data.message
				router.push({ name: "Login" })
			} catch (error) {
				state.message = error.response.data.error
			}
		},

		async confirm({ state }, token) {
			const response = await AuthenticationService.confirm(token)
			console.log(response.data)
		},

		async login({ state, commit, dispatch }, userInfo) {
			try {
				const response = await AuthenticationService.login(userInfo)
				commit("SET_USER", response.data)
				sessionStorage.setItem("token", response.data.token)
				sessionStorage.setItem("user", JSON.stringify(response.data.user))
				dispatch("getUserEvents")

				commit("SET_MESSAGE", response.data.error)
				router.push({ name: "AllEvents" })
			} catch (error) {
				state.message = error.response.data.error
			}
		},

		async getUserCreatedEvents({ state, commit }) {
			try {
				const userCreatedEvents = await EventService.getUserCreatedEvents(
					state.user.user_id
				)
				commit("SET_USER_CREATED_EVENTS", userCreatedEvents.data.userEvents)
			} catch (error) {
				console.log(error)
			}
		},

		async getUserEvents({ state, commit }) {
			try {
				const eventResponse = await EventService.getUserEvents(
					state.user.user_id
				)
				commit("SET_USER_EVENTS", eventResponse.data.data)
			} catch (error) {
				console.log(error)
			}
		},

		logout({ commit }) {
			commit("LOG_OUT")
			sessionStorage.removeItem("token")
			sessionStorage.removeItem("user")
		},

		searchedEvents({ commit }, events) {
			commit("SEARCHED_EVENTS", events)
		},

		async createEvent({ state, commit }, event) {
			try {
				const response = await EventService.createEvent(event)
				const id = response.data.event.event_id
				commit("SET_MESSAGE", response.data.message)
				router.push(`/event/${id}`)
			} catch (error) {
				commit("SET_MESSAGE", error.response.data.error)
			}
		},

		async getEvents({ state }) {
			try {
				const response = await EventService.getEvents()
				this.commit("SET_ALL_EVENTS", response.data.events)
				return response.data.events
			} catch (error) {
				console.log(error)
				state.message = error.response.data.error
			}
		},

		async getEvent({ state }, id) {
			const response = await EventService.getEvent(id)
			return response.data.event
		},

		async editEvent({ commit }, data) {
			try {
				const response = await EventService.updateEvent(data)
				commit("SET_MESSAGE", response.data.message)
				router.push({ name: "Profile" })
			} catch (error) {
				console.log(error)
			}
		},

		async deleteEvent({ commit }, data) {
			try {
				const response = await EventService.deleteEvent(data)
				commit("SET_MESSAGE", response.data.message)
				router.push({ name: "Profile" })
			} catch (error) {
				console.log(error)
			}
		},

		async markAttendance({ state, commit }, info) {
			try {
				const response = await EventService.markAttendance(info)

				const eventData = {
					number: response.data.number,
					id: info.event_id,
				}

				const event = await EventService.updateEventAttendance(eventData)
				commit("GET_EVENT", event.data.data)

				const eventResponse = await EventService.getUserEvents(
					state.user.user_id
				)
				let userEvents = eventResponse.data.data
				commit("SET_USER_EVENTS", userEvents)
				commit("SET_MESSAGE", response.data.message)
			} catch (error) {
				console.log(error)
				commit("SET_MESSAGE", error)
			}
		},

		async cancelAttendance({ state, commit }, eventData) {
			try {
				const response = await EventService.cancelAttendance(eventData)

				const info = {
					number: response.data.number,
					id: eventData.event_id,
				}
				const event = await EventService.updateEventAttendance(info)
				commit("GET_EVENT", event.data.data)

				const newArray = state.userEvents.filter((element) => {
					if (element.event_id != state.newEvent.event_id) {
						return element
					}
				})
				commit("SET_USER_EVENTS", newArray)
			} catch (error) {
				console.log(error)
				commit("SET_MESSAGE", error)
			}
		},
		savePageInfo({ commit }, info) {
			commit("SET_PAGE_INFO", info)
		},
	},
	getters: {},
	modules: {},
})
