<template>
	<div class="create-event">
		<form @submit.prevent="createEvent">
			<label for="">Title</label><br />
			<input type="text" placeholder="Title" v-model="event.title" /><br />

			<label for="">Description</label><br />
			<input
				type="text"
				placeholder="Description"
				v-model="event.description"
			/><br />

			<label for="">Category</label><br />
			<select v-model="event.category">
				<option v-for="cat in categories" :value="cat" :key="cat">
					{{ cat }}
				</option> </select
			><br />

			<label for="">Location</label><br />
			<input
				type="text"
				placeholder="Enter Address"
				v-model="event.location"
			/><br />

			<label for="">Date</label><br />
			<Datepicker
				placeholder="Enter date"
				v-model="event.date"
				:full-month-name="true"
				:format="customFormatter"
			/><br />

			<label for="">Time</label><br />
			<select v-model="event.time">
				<option v-for="time in times" :value="time" :key="time">
					{{ time }}
				</option> </select
			><br />

			<label for=""> Maximum number of Guests</label><br />
			<input
				type="number"
				placeholder="Enter number of guests"
				v-model.number="event.max_guests"
			/><br />

			<button type="submit">Create Event</button><br />
		</form>
		<p v-if="error" class="error">
			{{ error }}
		</p>
	</div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import moment from "moment"

export default {
	name: "Register",
	components: {
		Datepicker
	},
	data() {
		const times = []
		for (let i = 1; i < 13; i++) {
			times.push(`${i} am`)
		}

		for (let i = 1; i < 13; i++) {
			times.push(`${i} pm`)
		}

		return {
			categories: this.$store.state.categories,
			times,
			event: this.createEventData()
		}
	},
	computed: {
		error() {
			return this.$store.state.message
		},
		organiserId() {
			return this.$store.state.user[0]["user_id"]
		},
		organiserName() {
			return (
				this.$store.state.user[0]["first_name"] +
				" " +
				this.$store.state.user[0]["last_name"]
			)
		}
	},
	methods: {
		customFormatter(date) {
			return moment(date).format("dddd MMMM Do YYYY")
		},
		createEventData() {
			return {
				event_id: Math.random()
					.toString(16)
					.slice(2),
				title: "",
				category: "",
				description: "",
				organiser_id: this.$store.state.user["user_id"],
				organiser_name:
					this.$store.state.user["first_name"] +
					" " +
					this.$store.state.user["last_name"],
				location: "",
				time: "",
				date: "",
				max_guests: ""
			}
		},
		async createEvent() {
			try {
				await this.$store.dispatch("createEvent", this.event)
				this.event = this.createEventData()
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style scoped>
.error {
	color: red;
}
</style>
