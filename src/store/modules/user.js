import router from "@/router"
import AuthenticationService from "@/services/AuthenticationService"

export const namespaced = true

export const state = {
	user: null,
	logInStatus: false,
}

export const mutations = {
	SET_USER(state, userInfo) {
		state.user = userInfo.user
		if (userInfo.token) {
			state.logInStatus = true
		} else {
			state.logInStatus = false
		}
	},

	GET_USER(state, user) {
		state.user = user
		state.logInStatus = true
	},

	LOG_OUT(state) {
		state.user = null
		state.logInStatus = false
	},
}

export const actions = {
	async register({ dispatch }, userInfo) {
		try {
			const response = await AuthenticationService.register(userInfo)
			dispatch("setMessage", response.data.message, { root: true })
			router.push({ name: "Welcome" })
		} catch (error) {
			console.log(error)
			dispatch("setColor", "red", { root: true })
			dispatch("setMessage", error.response.data.error, { root: true })
		}
	},

	async confirm({ state }, token) {
		await AuthenticationService.confirm(token)
	},

	async login({ commit, dispatch }, userInfo) {
		try {
			const response = await AuthenticationService.login(userInfo)
			commit("SET_USER", response.data)
			sessionStorage.setItem("token", response.data.token)
			sessionStorage.setItem("user", JSON.stringify(response.data.user))
			dispatch("event/getUserEvents", null, { root: true })
			router.push({ name: "AllEvents" })
		} catch (error) {
			dispatch("setColor", "red", { root: true })
			dispatch("setMessage", error.response.data.error, { root: true })
		}
	},

	logout({ commit, dispatch }) {
		commit("LOG_OUT")
		sessionStorage.removeItem("token")
		sessionStorage.removeItem("user")
		dispatch("setMessage", null, { root: true })
		dispatch("event/setUserCreatedEvents", null, { root: true })
		dispatch("event/setUserEvents", null, { root: true })
	},

	getUser({ commit }, user) {
		commit("GET_USER", user)
	},
}
