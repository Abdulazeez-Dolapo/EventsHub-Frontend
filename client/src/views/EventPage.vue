<template>
	<div class="event-page">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">
					<i class="fas fa-cube"></i>{{ event.title }}
				</h5>
				<div class="card-text">
					<p>
						<i class="far fa-calendar-alt"></i>{{ formattedDate }}
						<i class="far fa-clock"></i>{{ event.time }}
					</p>

					<p><i class="fas fa-cubes"></i>{{ event.description }}</p>
					<p>
						<i class="fas fa-map-marker-alt">{{ event.location }}</i>
					</p>
					<p>
						<i class="fas fa-user-secret"></i>{{ event.organiser_name }}
					</p>
					<p><i class="fab fa-cuttlefish"></i> {{ event.category }}</p>
					<p>
						<i class="fas fa-users"></i
						>{{ event.number_attending }} attending
					</p>
					<p v-if="max">
						<i class="fas fa-exclamation-triangle"></i>{{ max }}
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
		max() {
			return this.maxGuest()
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
				const data = {
					event_id: this.event.event_id,
					event_title: this.event.title,
					organiser_id: this.event.organiser_id,
					guest_first_name: this.user.first_name,
					guest_last_name: this.user.last_name,
					guest_user_id: this.user.user_id,
				}
				await this.$store.dispatch("attendance/markAttendance", data)
				this.event = this.newEvent
			}
		},
		async cancel() {
			const eventArray = this.checkAttendance(this.userEvents)

			if (eventArray.includes(this.event.event_id)) {
				if (window.confirm("Are you sure you want to cancel?")) {
					try {
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
}
.card {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50%;
	transform: translate(-50%, -50%);
	padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.2s;
	transition-property: opacity;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
