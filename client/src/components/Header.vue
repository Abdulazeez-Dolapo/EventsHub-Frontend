<template>
	<div class="header">
		<button
			style="margin-right: 6rem"
			v-if="!logInStatus && this.$route.name !== 'Register'"
			@click="register"
		>
			Sign Up
		</button>
		<button
			style="margin-right: 6rem"
			v-if="!logInStatus && this.$route.name !== 'Login'"
			@click="login"
		>
			Login
		</button>

		<button
			style="margin-right: 6rem"
			v-if="logInStatus"
			@click="createEvent"
		>
			Create Event
		</button>

		<router-link :to="{ name: 'Home' }" style="margin-right: 6rem"
			>Home</router-link
		>

		<button v-if="this.$store.state.logInStatus" @click="logout">
			Logout
		</button>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	name: "Header",
	computed: {
		...mapState(["logInStatus"]),
	},
	methods: {
		logout() {
			this.$store.dispatch("logout")
			if (this.$route.name === "Home" || this.$route.name === "Event") {
				return
			} else {
				this.$router.push({ name: "Home" })
				return
			}
		},
		register() {
			this.$store.dispatch("reset")
			this.$router.push({ name: "Register" })
		},
		login() {
			this.$store.dispatch("reset")
			this.$router.push({ name: "Login" })
		},
		createEvent() {
			this.$router.push({ name: "Create-Event" })
		},
	},
}
</script>

<style></style>
