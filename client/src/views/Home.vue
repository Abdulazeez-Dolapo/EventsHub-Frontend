<template>
	<div class="home">
		<p>
			{{ logInStatus }}
		</p>
		<div
			class="event"
			v-for="event in events"
			:key="event.event_id"
			@click="viewEvent(event.event_id)"
		>
			<p>{{ formattedDate }} @{{ event.time }}</p>
			<h3>
				{{ event.title }}
			</h3>
			<p>
				{{ event.description }}
			</p>
			<p>
				{{ event.location }}
			</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"

export default {
	name: "Home",
	props: {
		events: {
			type: Array,
			required: true,
		},
	},
	computed: {
		...mapState(["logInStatus"]),
		formattedDate() {
			for (const event of this.events) {
				const date = new Date(event.date)
				const formattedDate = date.toLocaleString(["en-us"], {
					month: "long",
					day: "2-digit",
					year: "numeric",
				})
				return formattedDate
			}
		},
	},
	methods: {
		viewEvent(id) {
			this.$router.push({ path: `event/${id}` })
		},
	},
}
</script>
<style scoped>
.event {
	width: 60%;
	margin-left: 10rem;
	margin-bottom: 4rem;
	padding: 1rem;
	box-shadow: 1px 2px 5px #ccc;
}

.event:hover {
	cursor: pointer;
}
</style>
