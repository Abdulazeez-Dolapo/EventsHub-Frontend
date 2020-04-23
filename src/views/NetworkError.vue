<template>
	<div class="network">
		<h3>
			Oops! There seems to be an issue with your network connection. Please
			go back and try again or go to the
			<router-link to="/">homepage</router-link>
		</h3>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.network {
	padding: 2em;
	font-family: helvetica, "Times New Roman", Times, serif;
	background-color: #c27995;
	color: black;
	height: 92vh;
	text-align: center;
}
</style>
