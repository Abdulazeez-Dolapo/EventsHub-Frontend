<template>
	<div class="not-found">
		<h1>Oops! The {{ missing }} you're looking for does not exist</h1>
		<h3>
			Back to the
			<router-link to="/events">Events page</router-link>
		</h3>
	</div>
</template>

<script>
export default {
	props: {
		missing: {
			type: String,
			required: true,
		},
	},
}
</script>

<style scoped>
.not-found {
	padding: 1em;
	position: absolute;
	margin-top: 5rem;
	color: black;
}
</style>
