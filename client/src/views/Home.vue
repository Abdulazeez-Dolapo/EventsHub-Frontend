<template>
	<div class="home">
		<div class="text">
			<h1>
				Welcome to EventsHub
			</h1>
			<h3>
				Your home of events
			</h3>
			<button
				@click="login"
				class="btn btn-outline-info btn-rounded py-2 btn-block my-4 waves-effect z-depth-0"
			>
				Get Started
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	methods: {
		login() {
			this.$store.dispatch("logout")
			this.$router.push({ name: "Login" })
		}
	}
}
</script>

<style scoped>
.text {
	position: absolute;
	color: white;
	text-align: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

button {
	border-radius: 2em;
	background-color: #17a2bb;
	color: white;
}

button:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
