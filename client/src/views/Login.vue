<template>
	<div class="register">
		<label for="">Email</label><br />
		<input type="email" placeholder="Email" v-model="email" /><br />

		<label for="">Password</label><br />
		<input type="password" placeholder="Password" v-model="password" /><br />

		<button @click="login">Login</button>
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
			email: "",
			password: "",
		}
	},
	computed: {
		error() {
			return this.$store.state.message
		},
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
}
</script>

<style scoped>
.error {
	color: red;
}
</style>
