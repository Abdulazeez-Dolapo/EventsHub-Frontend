<template>
	<div class="login">
		<p v-if="routeMessage">
			{{ routeMessage }}
		</p>
		<label for="">Email</label><br />
		<input type="email" placeholder="Email" v-model="email" /><br />

		<label for="">Password</label><br />
		<input type="password" placeholder="Password" v-model="password" /><br />

		<button @click="login">Login</button>
		<p v-if="message" class="error">
			{{ message }}
		</p>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	name: "Register",
	data() {
		return {
			email: "",
			password: "",
		}
	},
	computed: {
		...mapState(["message", "routeMessage"]),
	},
	methods: {
		async login() {
			const userInfo = {
				email: this.email,
				password: this.password,
			}
			try {
				await this.$store.dispatch("login", userInfo)
			} catch (error) {
				console.log(error)
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		this.$store.state.routeMessage = null
		next()
	},
}
</script>

<style scoped>
.error {
	color: red;
}
</style>
