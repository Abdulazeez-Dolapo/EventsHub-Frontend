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
	margin-top: 5rem;
	color: black;
	padding: 2em;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

a {
	font-size: 2em;
}
</style>
