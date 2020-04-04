<template>
	<div class="register">
		<label for="">First Name</label><br />
		<input type="text" placeholder="First Name" v-model="firstName" /><br />

		<label for="">Last Name</label><br />
		<input type="text" placeholder="Last Name" v-model="lastName" /><br />

		<label for="">Email</label><br />
		<input type="email" placeholder="Email" v-model="email" /><br />

		<label for="">Password</label><br />
		<input type="password" placeholder="Password" v-model="password" /><br />

		<label for="">Confirm Password</label><br />
		<input
			type="password"
			placeholder="Enter Password again"
			v-model="confirmPassword"
		/><br />

		<button @click="register">Sign Up</button>
		<p v-if="error" class="error">
			{{ error }}
		</p>
	</div>
</template>

<script>
export default {
	name: "Register",
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		}
	},
	computed: {
		error() {
			return this.$store.state.message
		},
	},
	methods: {
		async register() {
			const id = Math.random()
				.toString(16)
				.slice(2)

			const userInfo = {
				first_name: this.firstName,
				last_name: this.lastName,
				email: this.email,
				password: this.password,
				user_id: id,
			}
			try {
				await this.$store.dispatch("register", userInfo)
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style scoped>
.error {
	color: red;
}
</style>
