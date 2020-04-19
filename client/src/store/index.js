import Vue from "vue"
import Vuex from "vuex"
import * as user from "./modules/user"
import * as event from "./modules/event"
import * as attendance from "./modules/attendance"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		event,
		attendance,
	},
	state: {
		savedPage: null,
		savedStart: null,
		savedEnd: null,
		routeMessage: null,
		message: "",
		displayNotification: false,
		categories: [
			"Wedding",
			"Anniversary",
			"Birthday",
			"Graduation",
			"Convocation",
			"Hackathon",
			"Meeting",
			"Conference",
		],
	},
	mutations: {
		SET_MESSAGE(state, message) {
			if (message) {
				state.message = message
				state.displayNotification = true
			} else {
				state.message = null
				state.displayNotification = false
			}
		},

		SET_ROUTE_MESSAGE(state, message) {
			state.routeMessage = message
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
		SET_DISPLAY(state, message) {
			if (message) {
				state.displayNotification = true
			} else {
				state.displayNotification = false
			}
		},
	},
	actions: {
		setRouteMessage({ commit }, message) {
			commit("SET_ROUTE_MESSAGE", message)
		},

		setMessage({ commit }, message) {
			commit("SET_MESSAGE", message)
		},
		savePageInfo({ commit }, info) {
			commit("SET_PAGE_INFO", info)
		},
		setDisplay({ commit }, message) {
			commit("SET_DISPLAY", message)
		},
	},
	getters: {},
})
