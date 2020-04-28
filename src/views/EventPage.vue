<template>
	<div class="event-page">
		<div class="card my-3" style="background-color: wheat">
			<div class="card-body">
				<p class="card-title" id="title">
					<span class="icon"><i class="fas fa-cube"></i></span
					>{{ event.title }}
				</p>
				<div class="card-text">
					<p>
						<span class="icon"><i class="fas fa-cubes"></i></span
						>{{ event.description }}
					</p>
					<p>
						<span class="icon"><i class="fab fa-cuttlefish"></i> </span
						>{{ event.category }}
					</p>
					<p>
						<span class="icon"><i class="far fa-calendar-alt"></i></span
						>{{ formattedDate }}
					</p>
					<p>
						<span class="icon"><i class="far fa-clock"></i></span
						>{{ formattedTime }}
					</p>
					<p>
						<span class="icon"><i class="fas fa-map-marker-alt"></i></span
						>{{ event.location }}
					</p>
					<p>
						<span class="icon"><i class="fas fa-user-secret"></i></span
						>{{ event.organiser_name }}
					</p>
					<p>
						<span class="icon"><i class="fas fa-users"></i></span
						>{{ event.number_attending }} attending
					</p>
					<p v-if="max">
						<span class="icon"
							><i
								style="color: red"
								class="fas fa-exclamation-triangle"
							></i></span
						>{{ max }}
					</p>
				</div>
				<button
					:disabled="max"
					class="btn btn-primary"
					v-if="logInStatus && !display"
					@click="attend"
				>
					Attend Event
				</button>

				<button
					class="btn btn-primary"
					v-if="logInStatus && display"
					@click="cancel"
				>
					Cancel attendance
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import NProgress from "nprogress"
import { timeMixin } from "../mixins/formatTime"
import { dateMixin } from "../mixins/formatDate"
export default {
	created() {
		this.display = this.displayButton()
	},
	updated() {
		this.maxGuest()
		this.display = this.displayButton()
	},
	props: {
		sentEvent: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			display: "",
			event: this.sentEvent,
		}
	},
	mixins: [dateMixin, timeMixin],
	computed: {
		...mapState({
			logInStatus: state => state.user.logInStatus,
			user: state => state.user.user,
			newEvent: state => state.event.newEvent,
			userEvents: state => state.event.userEvents,
			displayNotification: state => state.displayNotification,
		}),
		formattedDate() {
			return this.formatDate(this.event.date)
		},
		formattedTime() {
			return this.formatTime(this.event.time)
		},
		max() {
			return this.maxGuest()
		},
	},
	methods: {
		maxGuest() {
			if (this.event.number_attending == this.event.max_guests) {
				return "maximum attendance reached"
			}
		},
		checkAttendance(userEvents) {
			let eventArray = []

			if (userEvents) {
				userEvents.forEach(element => {
					eventArray.push(element.event_id)
				})
			}
			return eventArray
		},
		displayButton() {
			const eventArray = this.checkAttendance(this.userEvents)
			if (eventArray.includes(this.event.event_id)) {
				return true
			} else {
				return false
			}
		},
		async attend() {
			const eventArray = this.checkAttendance(this.userEvents)

			if (eventArray.includes(this.event.event_id)) {
				this.$store.dispatch("setColor", "red")
				this.$store.dispatch(
					"setMessage",
					"Attendance already booked for this event"
				)
				return
			} else {
				NProgress.start()
				const data = {
					event_id: this.event.event_id,
					event_title: this.event.title,
					organiser_id: this.event.organiser_id,
					guest_first_name: this.user.first_name,
					guest_last_name: this.user.last_name,
					guest_user_id: this.user.user_id,
				}
				await this.$store.dispatch("attendance/markAttendance", data)
				NProgress.done()
				this.event = this.newEvent
			}
		},
		async cancel() {
			const eventArray = this.checkAttendance(this.userEvents)

			if (eventArray.includes(this.event.event_id)) {
				if (window.confirm("Are you sure you want to cancel?")) {
					try {
						NProgress.start()
						const info = {
							event_id: this.event.event_id,
							guest_user_id: this.user.user_id,
						}
						await this.$store.dispatch(
							"attendance/cancelAttendance",
							info
						)
						this.event = this.newEvent
						this.$store.dispatch("setColor", "red")
						this.$store.dispatch(
							"setMessage",
							"Attendance successfully canceled"
						)
						NProgress.done()
					} catch (error) {
						console.log(error)
					}
				} else {
					return
				}
			} else {
				this.$store.dispatch("setColor", "red")
				this.$store.dispatch(
					"setMessage",
					"You have'nt marked your attendance at this event"
				)
				return
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch("setMessage", null)
		if (to.name == "AllEvents") {
			next()
		} else {
			this.$store.dispatch("savePageInfo", null)
			next()
		}
	},
}
</script>

<style scoped>
.event-page {
	width: 100%;
	min-height: 92vh;
	font-family: "Baloo Bhaina 2", cursive;
	background-color: #c27995;
	padding: 0.2rem;
}
.card {
	width: 50%;
	margin: 0 auto;
	padding: 0.1rem 1rem;
}
p {
	font-size: 1.2em;
}
.icon {
	display: inline-block;
	width: 2em;
}
button {
	background-color: #892c4f;
	border: #892c4f;
}
button:hover,
button:active {
	background-color: #580a28;
}
#title {
	font-size: 1.7em;
	font-weight: bolder;
}

@media screen and (min-width: 200px) and (max-width: 639px) {
	.card {
		margin: 0 auto;
		width: 80%;
	}
}
</style>
