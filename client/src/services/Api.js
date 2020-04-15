import axios from "axios"

export default () => {
	const token = sessionStorage.getItem("token")
	return axios.create({
		baseURL: `http://localhost:5000/`,
		headers: {
			authorization: `Bearer ${token}`
		},
		timeout: 10000
	})
}
