import Api from "@/services/Api"
import Register from "@/services/Register"

export default {
	register(formData) {
		return Register().post("register", formData)
	},
	login(formData) {
		return Api().post("login", formData)
	},
	confirm(token) {
		return Api().get(`confirm/${token}`)
	},
}
