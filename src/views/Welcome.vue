<template>
	<div class="welcome">
		<h1>{{ message }}</h1>
	</div>
</template>
<script>
import { mapState } from "vuex"
export default {
	computed: { ...mapState(["message"]) },
	created() {
		this.$store.dispatch("setDisplay", null)
	},
}
</script>
<style scoped>
.welcome {
	padding: 2em;
	font-family: helvetica, "Times New Roman", Times, serif;
	background-color: #c27995;
	color: black;
	height: 92vh;
	text-align: center;
}
</style>
