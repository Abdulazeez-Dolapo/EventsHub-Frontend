<template>
	<div class="event-page">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">{{ event.title }}</h5>
				<div class="card-text">
					<p>{{ formattedDate }} @{{ event.time }}</p>
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
					<p>
						{{ max }}
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
		...mapState([
			"logInStatus",
			"newEvent",
			"user",
			"userEvents",
			"displayNotification",
		]),
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
				userEvents.forEach((element) => {
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
				this.$store.commit(
					"SET_MESSAGE",
					"You have already marked your attendance at this event"
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
				await this.$store.dispatch("markAttendance", data)
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
						await this.$store.dispatch("cancelAttendance", info)
						this.event = this.newEvent
						this.$store.commit(
							"SET_MESSAGE",
							"You have successfully canceled your attendance at this event"
						)
					} catch (error) {
						console.log(error)
					}
				} else {
					return
				}
			} else {
				this.$store.commit(
					"SET_MESSAGE",
					"You have'nt marked your attendance at this event"
				)
				return
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit("SET_MESSAGE", null)
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
	width: 60%;
	margin-top: 4rem;
	margin-left: 10rem;
	margin-bottom: 4rem;
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
