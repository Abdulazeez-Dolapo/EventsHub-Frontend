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
import NProgress from "nprogress"
export default {
	name: "Home",
	methods: {
		login() {
			this.$store.dispatch("user/logout")
			this.$router.push({ name: "Login" })
		},
	},
}
</script>

<style scoped>
.home {
	background-image: url("../assets/kent-lee-9bG50r7S0cg-unsplash.jpg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: #892c4f;
	margin: 0;
	padding: 0;
	height: 92vh;
	position: relative;
}

.text {
	position: absolute;
	color: white;
	text-align: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: "Baloo Bhaina 2", cursive;
}

button {
	border: solid 1px #892c4f;
	border-radius: 2em;
	background-color: #892c4f;
	color: white;
}

button:hover {
	background-color: #611331;
	border: solid 1px #892c4f;
}
</style>
