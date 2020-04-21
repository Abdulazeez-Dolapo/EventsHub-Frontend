<template>
	<div class="notification">
		<p :class="color"><i class="fas fa-info-circle"></i>{{ message }}</p>
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
		...mapState(["message", "color"]),
	},
	watch: {
		message() {
			clearTimeout(this.clear)
			this.timer()
		},
	},
	mounted() {
		this.timer()
	},
	methods: {
		timer() {
			this.clear = setTimeout(() => {
				this.$store.dispatch("setDisplay", null)
			}, 5000)
		},
	},
	beforeDestroy() {
		clearTimeout(this.clear)
	},
}
</script>

<style scoped>
.notification {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	background-color: whitesmoke;
	border: solid 2px black;
	text-align: center;
	margin-bottom: 0.2em;
	margin-right: 0.2em;
	z-index: 2;
	max-width: 28%;
	min-height: 5%;
	padding: 0.2em;
	font-size: 1em;
	bottom: 0;
	right: 0;
	position: fixed;
}

.red {
	color: red;
}

.green {
	color: green;
}

.black {
	color: black;
}
</style>
