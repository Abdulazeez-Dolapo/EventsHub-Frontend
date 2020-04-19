<template>
	<div class="confirm">
		<div v-if="!error">
			<h1>
				Congratulations! Your email has been confirmed. Click the link below
				to
			</h1>
			<router-link to="/login">Login</router-link>
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
	position: absolute;
	margin-top: 5rem;
	color: black;
}
</style>
