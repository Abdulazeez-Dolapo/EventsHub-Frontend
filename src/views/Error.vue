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
	padding: 2em;
	font-family: helvetica, "Times New Roman", Times, serif;
	background-color: #c27995;
	color: black;
	height: 92vh;
	text-align: center;
}
</style>
