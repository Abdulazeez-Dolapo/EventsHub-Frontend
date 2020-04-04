<template>
	<div class="home">
		{{ userData }}
		<p>
			{{ token }}
		</p>
		<p>
			{{ login }}
		</p>
		<p>
			{{ message }}
		</p>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "Home",
	data() {
		return {
			userData: "",
			message: "",
			token: "",
			login: "",
		}
	},
	mounted() {
		this.user()
	},
	methods: {
		user() {
			this.userData = this.$store.state.user
			this.token = this.$store.state.token
			this.login = this.$store.state.isUserLoggedIn
			this.message = this.$store.state.message
		},
	},
}
</script>
