<template>
	<div>
		<div>
			<router-link to="/profile">
				Back to profile
			</router-link>
		</div>
		<form @submit.prevent="editEvent" style="margin-left: 6em;">
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

			<button type="submit">Edit Event</button><br />
		</form>
		<p v-if="error" class="error">
			{{ error }}
		</p>
	</div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import moment from "moment"
import { mapState } from "vuex"

export default {
	props: {
		eventData: {
			type: Object,
			required: true,
		},
	},
	components: {
		Datepicker,
	},
	computed: {
		...mapState(["categories"]),
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
			error: null,
			times,
			event: this.editEventData(),
			submitted: false,
		}
	},
	methods: {
		editEventData() {
			return {
				event_id: this.$route.params.id,
				title: this.eventData.title,
				category: this.eventData.category,
				description: this.eventData.description,
				location: this.eventData.location,
				time: this.eventData.time,
				date: this.eventData.date,
				max_guests: this.eventData.max_guests,
			}
		},
		customFormatter(date) {
			return moment(date).format("dddd MMMM Do YYYY")
		},
		async editEvent() {
			this.submitted = true
			await this.$store.dispatch("editEvent", this.event)
		},
	},
	beforeRouteLeave(to, from, next) {
		if (!this.submitted) {
			if (
				window.confirm(
					"You have unsaved changes. Are you sure you want to exit?"
				)
			) {
				next()
			} else {
				next(false)
			}
		} else {
			next()
		}
	},
}
</script>

<style></style>
