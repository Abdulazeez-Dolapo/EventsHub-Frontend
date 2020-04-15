<template>
	<div class="not-found">
		<h1>Oops! The {{ missing }} you're looking for doesnt exist</h1>
		<h3 v-if="missing == 'page'">
			Back to the
			<router-link to="/">homepage</router-link>
		</h3>

		<h3 v-if="missing == 'event'">
			Back to the
			<router-link to="/events">Events Page</router-link>
		</h3>
	</div>
</template>

<script>
export default {
	props: {
		missing: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>
.not-found {
	position: absolute;
	margin-top: 5rem;
	color: white;
}
</style>
