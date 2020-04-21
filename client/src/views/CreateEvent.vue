<template>
	<div class="create-event">
		<div class="form">
			<div class="card" style="border: none;">
				<h5
					class="card-header info-color white-text text-center py-3"
					style="background-color: #892c4f; color: white;"
				>
					<strong>Create Your Event</strong>
				</h5>

				<div class="card-body px-lg-5 pt-0 mt-2">
					<form
						@submit.prevent="createEvent"
						class="text-center"
						style="color: black;"
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
											'mb-2',
											'border-dark',
										]"
										@opened="$v.event.date.$touch()"
									/>
								</div>
								<div v-if="$v.event.date.$error" class="error">
									<p v-if="!$v.event.date.required">
										Date is required
									</p>
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
							class="browser-default custom-select mb-2 border-dark"
							:class="{ 'border-danger': $v.event.category.$error }"
							@blur="$v.event.category.$touch()"
							v-model="event.category"
						>
							<option value="" disabled>Choose category</option>
							<option v-for="cat in categories" :value="cat" :key="cat">
								{{ cat }}
							</option>
						</select>
						<div v-if="$v.event.category.$error" class="error">
							<p v-if="!$v.event.category.required">
								Category is required
							</p>
						</div>

						<div class="md-form mt-0">
							<input
								placeholder="Title"
								type="text"
								id="title"
								class="form-control mb-2 border-dark"
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
								class="form-control md-textarea mb-2 border-dark"
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

									<div v-if="$v.event.location.$error" class="error">
										<p v-if="!$v.event.location.required">
											Location is required
										</p>
										<p
											v-if="
												!$v.event.location.minLength ||
													!$v.event.location.maxLength
											"
										>
											Location should not be less than 3 characters
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
									<label for="number">Maximum number of guests</label>

									<div v-if="$v.event.max_guests.$error" class="error">
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
							class="btn btn-outline-info btn-rounded btn-block my-2 waves-effect z-depth-0"
							style="background-color: #892c4f; color: white; border: solid 1px #892c4f;"
							type="submit"
							:disabled="$v.$invalid || !event.time || !event.date"
						>
							<strong>
								Create Event
							</strong>
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import Datepicker from "vuejs-datepicker"
import moment from "moment"
import {
	required,
	minLength,
	maxLength,
	integer,
} from "vuelidate/lib/validators"

export default {
	created() {
		this.$store.dispatch("setMessage", null)
	},
	name: "Register",
	components: {
		Datepicker,
	},
	data() {
		return {
			event: this.createEventData(),
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
			category: { required },
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
			time: { required },
			date: { required },
			max_guests: { required, integer },
		},
	},
	created() {
		this.event.organiser_name = this.organiserName
		this.event.organiser_id = this.organiserId
	},
	computed: {
		...mapState({
			categories: state => state.categories,
			organiserId: state => state.user.user["user_id"],
			organiserName: state =>
				`${state.user.user["first_name"]} ${state.user.user["last_name"]}`,
			login: state => state.user.logInStatus,
		}),
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
				location: "",
				time: "",
				date: "",
				max_guests: "",
				organiser_id: "",
				organiser_name: "",
			}
		},
		async createEvent() {
			try {
				this.$v.$touch()
				if (!this.$v.$invalid) {
					this.submitted = true
					await this.$store.dispatch("event/createEvent", this.event)
					this.event = this.createEventData()
				} else {
					return
				}
			} catch (error) {
				console.log(error)
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
.error {
	color: red;
}

.form {
	width: 40%;
	margin: 0 28%;
	margin-top: 4%;
	box-shadow: 1px 2px 1vh #892c4f;
	position: absolute;
}

button:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
