import axios from "axios"

export default () => {
	const token = sessionStorage.getItem("token")
	return axios.create({
		baseURL: `https://eventshub-express.herokuapp.com/`,
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": `multipart/form-data`,
		},
		timeout: 10000,
	})
}
