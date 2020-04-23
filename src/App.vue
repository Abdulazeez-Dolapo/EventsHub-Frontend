<template>
	<div id="app">
		<div class="header">
			<Header />
		</div>
		<div class="page">
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
			<transition name="fade" mode="out-in" appear>
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
import axios from "axios"

export default {
	created() {
		this.checkUser()
	},
	components: {
		Header,
		Notification,
	},
	computed: {
		...mapState(["displayNotification"]),
	},
	methods: {
		async checkUser() {
			const token = sessionStorage.getItem("token")
			if (token) {
				const user = JSON.parse(sessionStorage.getItem("user"))
				await this.$store.dispatch("user/getUser", user)
				await this.$store.dispatch("event/getUserCreatedEvents")
				await this.$store.dispatch("event/getUserEvents")
				axios.interceptors.response.use(
					response => response,
					error => {
						if (error.response.status === 401) {
							store.dispatch("user/logout")
							router.push({ name: "AllEvents" })
						}
						console.log(error)
					}
				)
			} else {
				store.dispatch("user/logout")
			}
		},
	},
}
</script>
<style scoped>
.header {
	height: 8vh;
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
