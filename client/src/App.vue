<template>
	<div id="app">
		<div class="cover">
			<Header />
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
			<transition name="fade" appear>
				<div class="notification" v-if="displayNotification">
					<Notification />
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import Header from "@/components/Header"
import Notification from "@/components/Notification"
import { mapState } from "vuex"

export default {
	components: {
		Header,
		Notification,
	},
	computed: {
		...mapState(["displayNotification"]),
	},
	created() {
		const token = sessionStorage.getItem("token")
		if (token) {
			const user = JSON.parse(sessionStorage.getItem("user"))
			this.$store.state.logInStatus = true
			this.$store.state.user = user
		} else {
			this.$store.state.logInStatus = false
		}
	},
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
