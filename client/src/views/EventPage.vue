<template>
	<div class="event-page">
		<div>
			<p v-if="message">
				{{ message }}
			</p>
		</div>
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

			<button v-if="logInStatus" @click="cancel">
				Cancel attendance
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	created() {
		this.clearMessage()
	},
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			message: this.$store.state.message
		}
	},
	computed: {
		...mapState(["logInStatus", "newEvent", "user", "userEvents"]),
		formattedDate() {
			return this.formatDate(this.event.date)
		}
	},
	methods: {
		formatDate(date) {
			const dateToFormat = new Date(date)
			const formattedDate = dateToFormat.toLocaleString(["en-us"], {
				month: "long",
				day: "2-digit",
				year: "numeric"
			})

			return formattedDate
		},
		async attend() {
			let eventArray = []

			if (this.userEvents) {
				this.userEvents.forEach(element => {
					eventArray.push(element.event_id)
				})
			}

			if (eventArray.includes(this.event.event_id)) {
				alert("You have already marked your attendance at this event")
				return
			} else {
				const data = {
					event_id: this.event.event_id,
					event_title: this.event.title,
					organiser_id: this.event.organiser_id,
					guest_first_name: this.user.first_name,
					guest_last_name: this.user.last_name,
					guest_user_id: this.user.user_id
				}
				await this.$store.dispatch("markAttendance", data)
				this.event = this.newEvent
				this.message = "You have successfully marked your attendance"
				this.clearMessage()
			}
		},
		async cancel() {
			if (window.confirm("Are you sure you want to cancel?")) {
				try {
					const info = {
						event_id: this.event.event_id,
						guest_user_id: this.user.user_id
					}
					await this.$store.dispatch("cancelAttendance", info)
					this.event = this.newEvent
					this.message = "You have successfully canceled your attendance"
					this.clearMessage()
				} catch (error) {
					console.log(error)
				}
			} else {
				return
			}
		},
		clearMessage() {
			setTimeout(() => {
				this.message = null
				this.$store.state.message = null
			}, 2000)
		}
	}
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
