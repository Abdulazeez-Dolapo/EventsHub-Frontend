<template>
	<div id="app">
		<Header />
		<router-view />
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
<style></style>
