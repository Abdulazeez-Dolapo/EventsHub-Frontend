<template>
	<div class="event-page">
		<div class="event">
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
			<p>
				{{ event.organiser_name }}
			</p>
			<p>
				{{ event.category }}
			</p>
			<p>{{ event.number_attending }} attending</p>
			<button v-if="logInStatus" @click="attend">
				Attend Event
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	props: {
		event: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapState(["logInStatus", "newEvent", "user"]),
		formattedDate() {
			return this.formatDate(this.event.date)
		},
	},
	methods: {
		formatDate(date) {
			const dateToFormat = new Date(date)
			const formattedDate = dateToFormat.toLocaleString(["en-us"], {
				month: "long",
				day: "2-digit",
				year: "numeric",
			})

			return formattedDate
		},
		async attend() {
			const data = {
				event_id: this.event.event_id,
				event_title: this.event.title,
				organiser_id: this.event.organiser_id,
				guest_first_name: this.user.first_name,
				guest_last_name: this.user.last_name,
				guest_user_id: this.user.user_id,
			}
			await this.$store.dispatch("markAttendance", data)
			this.event = this.newEvent
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
</style>
