<template>
	<div id="app">
		<div class="cover">
			<Header />
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</div>
	</div>
</template>
<script>
import jwt from "jsonwebtoken"
import Header from "@/components/Header"

export default {
	components: {
		Header
	},
	created() {
		const token = sessionStorage.getItem("token")
		if (token) {
			this.$store.state.logInStatus = true
			const decoded = jwt.verify(token, "secret")
			this.$store.state.user = decoded
		} else {
			this.$store.state.logInStatus = false
		}
	}
}
</script>
<style scoped>
#app {
	background-image: url("./assets/kent-lee-9bG50r7S0cg-unsplash.jpg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: #17a2bb;
	margin: 0;
	padding: 0;
	height: 94.9vh;
	position: relative;
}
.cover {
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
	height: 94.9vh;
	position: relative;
}
.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
