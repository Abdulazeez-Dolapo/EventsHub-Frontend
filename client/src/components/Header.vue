<template>
	<div class="header">
		<router-link
			style="margin-right: 6rem"
			:to="{ name: 'Register' }"
			v-if="!this.$store.state.isUserLoggedIn"
			>Sign Up</router-link
		>
		<router-link
			:to="{ name: 'Login' }"
			v-if="!this.$store.state.isUserLoggedIn"
			>Login</router-link
		>

		<button v-if="this.$store.state.isUserLoggedIn" @click="logout">
			Logout
		</button>
	</div>
</template>

<script>
export default {
	name: "Header",
	methods: {
		logout() {
			this.$store.dispatch("logout")
		},
	},
}
</script>

<style></style>
