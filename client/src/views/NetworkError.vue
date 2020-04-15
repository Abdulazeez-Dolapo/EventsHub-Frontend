<template>
	<div class="network">
		<h1>Oops! Seems there was an issue with your network connection</h1>
		<h3>Please go back and try again</h3>
		<h3>Or go to the <router-link to="/">homepage</router-link></h3>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.network {
	position: absolute;
	margin-top: 5rem;
	color: white;
}
</style>
