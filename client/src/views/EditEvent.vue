<template>
	<div class="edit-event">
		<div class="form">
			<div @submit.prevent="" class="form">
				<div class="card" style="border: none">
					<h5
						class="card-header info-color white-text text-center py-3"
						style="background-color: #17a2bb; color: white;"
					>
						<strong>Edit Event</strong>
					</h5>

					<div class="card-body px-lg-5 pt-0 mt-2">
						<form class="text-center" style="color: #757575;">
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
												'mb-4',
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
								<option
									v-for="cat in categories"
									:value="cat"
									:key="cat"
								>
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
									:class="{ 'border-danger': $v.event.title.$error }"
									@blur="$v.event.title.$touch()"
								/>

								<div v-if="$v.event.title.$error" class="error">
									<p v-if="!$v.event.title.required">
										Title is required
									</p>
									<p
										v-if="
											!$v.event.title.minLength ||
												!$v.event.title.maxLength
										"
									>
										Title should not be less than 5 characters
									</p>
								</div>
							</div>

							<div class="md-form mt-3">
								<textarea
									placeholder="Description"
									id="description"
									class="form-control md-textarea"
									rows="3"
									v-model="event.description"
									:class="{
										'border-danger': $v.event.description.$error,
									}"
									@blur="$v.event.description.$touch()"
								></textarea>

								<div v-if="$v.event.description.$error" class="error">
									<p v-if="!$v.event.description.required">
										Description is required
									</p>
									<p
										v-if="
											!$v.event.description.minLength ||
												!$v.event.description.maxLength
										"
									>
										Description should be between 5 and 500 characters
									</p>
								</div>
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
											:class="{
												'border-danger': $v.event.location.$error,
											}"
											@blur="$v.event.location.$touch()"
										/>
										<label for="location">Location</label>

										<div
											v-if="$v.event.location.$error"
											class="error"
										>
											<p v-if="!$v.event.location.required">
												Location is required
											</p>
											<p
												v-if="
													!$v.event.location.minLength ||
														!$v.event.location.maxLength
												"
											>
												Location should not be less than 3
												characters
											</p>
										</div>
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
											:class="{
												'border-danger': $v.event.max_guests.$error,
											}"
											@blur="$v.event.max_guests.$touch()"
										/>
										<label for="number"
											>Maximum number of guests</label
										>

										<div
											v-if="$v.event.max_guests.$error"
											class="error"
										>
											<p
												v-if="
													!$v.event.max_guests.required ||
														!$v.event.max_guests.integer
												"
											>
												Number is required
											</p>
										</div>
									</div>
								</div>
							</div>
							<button
								id="btn"
								class="btn btn-outline-info btn-rounded my-2 waves-effect z-depth-0"
								:disabled="$v.$invalid"
								@click="editEvent"
							>
								Confirm edit
							</button>
							<button @click="deleteEvent">
								<i
									class="fas fa-trash-alt"
									style="color: red"
								></i></button
							><br />
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import moment from "moment"
import { mapState } from "vuex"
import {
	required,
	minLength,
	maxLength,
	integer,
} from "vuelidate/lib/validators"

export default {
	created() {
		this.$store.commit("SET_MESSAGE", null)
	},
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
	validations: {
		event: {
			title: {
				required,
				minLength: minLength(5),
				maxLength: maxLength(50),
			},
			description: {
				required,
				minLength: minLength(5),
				maxLength: maxLength(500),
			},
			location: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(100),
			},
			max_guests: { required, integer },
		},
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
			this.$v.$touch()
			if (!this.$v.$invalid) {
				this.submitted = true
				await this.$store.dispatch("editEvent", this.event)
			} else {
				return
			}
		},
		async deleteEvent() {
			if (
				window.confirm(
					"This event can not be recovered. Are you sure you want to delete it?"
				)
			) {
				this.submitted = true
				await this.$store.dispatch("deleteEvent", this.$route.params.id)
			} else {
				return
			}
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

<style scoped>
.edit-event {
	width: 40%;
	margin: 0 28%;
	margin-top: 4%;
	box-shadow: 1px 2px 1vh #17a2bb;
	position: absolute;
}

#btn:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
