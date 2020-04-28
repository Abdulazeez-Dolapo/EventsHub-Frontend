<template>
	<div class="edit-event">
		<div class="error text-center" v-if="error">
			<h2>
				{{ error }}
			</h2>
			<p class="text-center mt-4">
				Please go to your
				<router-link to="/profile">profile</router-link> to view events you
				created
			</p>
		</div>
		<div class="form" v-else>
			<div @submit.prevent="" class="form">
				<div class="card" style="border: none">
					<h5
						class="card-header info-color white-text text-center py-3"
						style="background-color: #892c4f; color: white;"
					>
						<strong>Edit Event</strong>
					</h5>

					<div class="card-body px-lg-5 pt-0 mt-2">
						<form class="text-center" style="color: black;">
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
												'border-dark',
												'mb-4',
											]"
										/>
									</div>
								</div>
								<div class="col">
									<div class="md-form">
										<b-form-timepicker
											placeholder="Choose a time"
											:hour12="true"
											v-model="event.time"
											class="border-dark py-1"
											size="sm"
											locale="en"
										></b-form-timepicker>
									</div>
								</div>
							</div>

							<select
								class="browser-default custom-select mb-4 border-dark"
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
									class="form-control border-dark"
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
									class="form-control md-textarea border-dark"
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
											class="form-control border-dark"
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
											class="form-control border-dark"
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
							<div class="buttons">
								<button
									id="btn"
									class="btn btn-outline-info btn-rounded my-2 waves-effect z-depth-0"
									style="background-color: #892c4f; color: white; border: solid 1px #892c4f; width: 84%; font-size: 1.1em"
									:disabled="$v.$invalid || !event.time || !event.date"
									@click="editEvent"
								>
									<strong>Confirm edit</strong>
								</button>
								<button
									id="del"
									class="pt-2 ml-4 mr-0"
									@click="deleteEvent"
								>
									<i class="fas fa-trash-alt"></i></button
								><br />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import NProgress from "nprogress"
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
		this.checkEligibility()
		this.$store.dispatch("setMessage", null)
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
		...mapState({
			login: state => state.user.logInStatus,
			categories: state => state.categories,
			user: state => state.user.user.user_id,
		}),
	},
	data() {
		return {
			error: null,
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
				NProgress.start()
				this.submitted = true
				await this.$store.dispatch("event/editEvent", this.event)
				NProgress.done()
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
				NProgress.start()
				this.submitted = true
				await this.$store.dispatch(
					"event/deleteEvent",
					this.$route.params.id
				)
				NProgress.done()
			} else {
				return
			}
		},
		checkEligibility() {
			const organiser = this.eventData.organiser_id
			const user = this.user
			if (organiser == user) {
				return
			} else {
				this.submitted = true
				this.error =
					"You are not the creator of this event so you don't have the necessary authorization to edit it."
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		if (!this.login) {
			next()
		} else {
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
	},
}
</script>

<style scoped>
.edit-event {
	width: 40%;
	margin: 0 auto;
	margin-top: 4%;
	box-shadow: 1px 2px 1vh #892c4f;
}

.buttons {
	display: flex;
}

#btn:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}

#del {
	border: none;
	background-color: inherit;
	font-size: 1.9em;
	color: red;
	float: right;
}

.error {
	color: red;
}

@media screen and (min-width: 200px) and (max-width: 500px) {
	.edit-event {
		margin: 0 auto;
		margin-top: 4%;
		width: 80%;
	}
}

@media screen and (min-width: 501px) and (max-width: 760px) {
	.edit-event {
		margin: 0 auto;
		margin-top: 4%;
		width: 60%;
	}
}
</style>
