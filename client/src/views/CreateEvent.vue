<template>
	<div class="create-event">
		<div class="form">
			<div class="card" style="border: none">
				<h5
					class="card-header info-color white-text text-center py-3"
					style="background-color: #17a2bb; color: white;"
				>
					<strong>Create Your Event</strong>
				</h5>

				<div class="card-body px-lg-5 pt-0 mt-2">
					<form
						@submit.prevent="createEvent"
						class="text-center"
						style="color: #757575;"
					>
						<div class="form-row">
							<div class="col">
								<div class="md-form">
									<Datepicker
										id="date"
										placeholder="Choose date"
										v-model="event.date"
										:full-month-name="true"
										:format="customFormatter"
										:input-class="[
											'browser-default',
											'custom-select',
											'mb-4'
										]"
									/>
								</div>
							</div>
							<div class="col">
								<div class="md-form">
									<select
										class="browser-default custom-select mb-4"
										v-model="event.time"
										id="time"
									>
										<option value="" disabled>Choose time</option>
										<option
											v-for="time in times"
											:value="time"
											:key="time"
										>
											{{ time }}
										</option>
									</select>
								</div>
							</div>
						</div>

						<select
							class="browser-default custom-select mb-4"
							v-model="event.category"
						>
							<option value="" disabled>Choose category</option>
							<option v-for="cat in categories" :value="cat" :key="cat">
								{{ cat }}
							</option>
						</select>

						<div class="md-form mt-0">
							<input
								placeholder="Title"
								type="text"
								id="title"
								class="form-control"
								v-model="event.title"
							/>
						</div>

						<div class="md-form mt-3">
							<textarea
								placeholder="Description"
								id="description"
								class="form-control md-textarea"
								rows="3"
								v-model="event.description"
							></textarea>
						</div>

						<div class="form-row mt-3">
							<div class="col">
								<div class="md-form">
									<input
										type="text"
										id="location"
										class="form-control"
										aria-describedby="location"
										v-model="event.location"
									/>
									<label for="location">Location</label>
								</div>
							</div>
							<div class="col">
								<div class="md-form">
									<input
										type="number"
										id="number"
										class="form-control"
										aria-describedby="number"
										v-model.number="event.max_guests"
									/>
									<label for="number">Maximum number of guests</label>
								</div>
							</div>
						</div>
						<button
							class="btn btn-outline-info btn-rounded btn-block my-2 waves-effect z-depth-0"
							type="submit"
						>
							Create Event
						</button>
					</form>

					<p v-if="error" class="error">
						{{ error }}
					</p>
				</div>
			</div>
		</div>
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
			event: this.createEventData(),
			submitted: false
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
				this.submitted = true
				await this.$store.dispatch("createEvent", this.event)
				this.event = this.createEventData()
			} catch (error) {
				console.log(error)
			}
		}
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
	}
}
</script>

<style scoped>
.error {
	color: red;
}

.form {
	width: 40%;
	margin: 0 28%;
	margin-top: 4%;
	box-shadow: 1px 2px 1vh #17a2bb;
	position: absolute;
}

button:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
