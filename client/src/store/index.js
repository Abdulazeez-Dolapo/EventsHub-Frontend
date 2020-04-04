import Vue from "vue"
import Vuex from "vuex"
import router from "../router"
import AuthenticationService from "../services/AuthenticationService"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: [],
		token: null,
		isUserLoggedIn: false,
		message: "",
	},
	mutations: {
		SET_USER(state, userInfo) {
			state.user.push(userInfo.user)
			state.token = userInfo.token
			if (state.token) {
				state.isUserLoggedIn = true
			} else {
				state.isUserLoggedIn = false
			}
		},
		LOG_OUT(state) {
			state.user = null
			state.token = null
			state.isUserLoggedIn = false
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
				console.log(response)
				commit("SET_USER", response.data)
				state.message = response.data.message
				router.push({ name: "Home" })
			} catch (error) {
				state.message = error.response.data.error
			}
		},

		logout({ commit }) {
			commit("LOG_OUT")
			router.push({ name: "Home" })
		},
	},
	getters: {},
	modules: {},
})
