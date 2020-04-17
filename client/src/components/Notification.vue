<template>
	<div class="notification">
		<h1>
			{{ message }}
		</h1>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	data() {
		return {
			clear: null,
		}
	},
	computed: {
		...mapState(["message"]),
	},
	mounted() {
		this.clear = setTimeout(() => {
			this.$store.state.displayNotification = false
		}, 5000)
	},
	beforeDestroy() {
		clearTimeout(this.clear)
	},
}
</script>

<style scoped>
.notification {
	background-color: white;
}
</style>
