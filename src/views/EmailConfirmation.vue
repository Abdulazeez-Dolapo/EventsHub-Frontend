<template>
	<div class="confirm">
		<div v-if="!error">
			<h2>
				Congratulations! Your email has been confirmed.
			</h2>
			<router-link tag="a" to="/login">Click this link to Login</router-link>
		</div>
		<div v-else>
			<h1>
				There was a problem trying to confirm your email. Please go back and
				click the link again.
			</h1>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		error: {
			type: Boolean,
		},
	},
}
</script>

<style scoped>
.confirm {
	color: black;
	padding: 2em;
	font-family: helvetica, "Times New Roman", Times, serif;
	background-color: #c27995;
	height: 92vh;
}

a {
	font-size: 2em;
}
</style>
