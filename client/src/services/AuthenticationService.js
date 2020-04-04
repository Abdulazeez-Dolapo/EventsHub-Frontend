import Api from "@/services/Api"

export default {
	register(formData) {
		return Api().post("register", formData)
	},
	login(formData) {
		return Api().post("login", formData)
	},
}
