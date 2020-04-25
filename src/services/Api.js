import axios from "axios"

export default () => {
	const token = sessionStorage.getItem("token")
	return axios.create({
		baseURL: `https://eventshub-express.herokuapp.com/`,
		headers: {
			authorization: `Bearer ${token}`,
		},
		timeout: 15000,
	})
}
