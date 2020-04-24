<template>
	<div class="register">
		<div class="form">
			<div class="card" style="border: solid 1px  #892c4f;">
				<h5
					class="card-header info-color white-text text-center py-3"
					style="background-color: #892c4f; color: white;"
				>
					<strong>Sign up</strong>
				</h5>

				<div class="card-body px-lg-3 pt-0 mt-2">
					<form
						@submit.prevent="register"
						class="text-center"
						style="color: black;"
						enctype="multipart/form-data"
					>
						<div class="form-row my-2" style="width: 99%">
							<div class="col">
								<!-- First name -->
								<div class="md-form">
									<div style="display: flex;">
										<i class="fas fa-user"></i>
										<input
											type="text"
											placeholder="First Name"
											id="materialRegisterFormFirstName"
											v-model="firstName"
											class="form-control"
											:class="{
												'border-danger': $v.firstName.$error,
											}"
											@blur="$v.firstName.$touch()"
										/>
									</div>
									<div v-if="$v.firstName.$error" class="error">
										<p
											v-if="
												!$v.firstName.minLength ||
													!$v.firstName.maxLength ||
													!$v.firstName.alpha
											"
										>
											First Name shouldn't be less than 3 letters
										</p>
										<p v-if="!$v.firstName.required">
											First name is required
										</p>
									</div>
								</div>
							</div>

							<div class="col">
								<!-- Last name -->
								<div class="md-form">
									<div style="display: flex;">
										<i class="fas fa-user"></i>
										<input
											type="text"
											id="materialRegisterFormLastName"
											placeholder="Last Name"
											v-model="lastName"
											class="form-control"
											:class="{
												'border-danger': $v.lastName.$error,
											}"
											@blur="$v.lastName.$touch()"
										/>
									</div>
									<div v-if="$v.lastName.$error" class="error">
										<p
											v-if="
												!$v.lastName.minLength ||
													!$v.lastName.maxLength ||
													!$v.lastName.alpha
											"
										>
											Last Name shouldn't be less than 3 letters
										</p>
										<p v-if="!$v.lastName.required">
											Last name is required
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- E-mail -->
						<div class="md-form mt-3">
							<div style="display: flex;">
								<i class="fas fa-envelope-square"></i>
								<input
									type="email"
									placeholder="Email"
									id="materialRegisterFormEmail"
									v-model="email"
									class="form-control"
									:class="{ 'border-danger': $v.email.$error }"
									@blur="$v.email.$touch()"
								/>
							</div>
							<div v-if="$v.email.$error" class="error">
								<p v-if="!$v.email.email">Please enter a valid email</p>
								<p v-if="!$v.email.required">
									Email is required
								</p>
							</div>
						</div>

						<!-- Password -->
						<div class="md-form mt-3">
							<div style="display: flex;">
								<i class="fas fa-lock"></i>
								<input
									type="password"
									placeholder="Password"
									id="materialRegisterFormPassword"
									aria-describedby="materialRegisterFormPasswordHelpBlock"
									v-model="password"
									class="form-control"
									:class="{ 'border-danger': $v.password.$error }"
									@blur="$v.password.$touch()"
								/>
							</div>

							<div v-if="$v.password.$error" class="error">
								<p v-if="!$v.password.required">
									Password is required
								</p>
								<p
									v-if="
										!$v.password.minLength || !$v.password.maxLength
									"
								>
									Password should be between 8 and 32 characters
								</p>
							</div>
						</div>

						<!-- Confirm password -->
						<div class="md-form mt-3">
							<div style="display: flex;">
								<i class="fas fa-lock"></i>
								<input
									type="password"
									placeholder="Confirm Password"
									id="materialRegisterFormPhone"
									class="form-control"
									aria-describedby="materialRegisterFormPasswordHelpBlock"
									v-model="confirmPassword"
									:class="{
										'border-danger': $v.confirmPassword.$error,
									}"
									@blur="$v.confirmPassword.$touch()"
								/>
							</div>

							<div v-if="$v.confirmPassword.$error" class="error">
								<p v-if="!$v.confirmPassword.same">
									Passwords should match
								</p>
							</div>
						</div>

						<div class="form-group mt-3">
							<input
								type="file"
								class="form-control-file ml-2"
								style="width: 95%; height: 2.3em;"
								id="exampleFormControlFile1"
								ref="image"
								accept="image/jpeg image/jpg image/png"
								@change="upload"
							/>
						</div>

						<!-- Sign up button -->
						<button
							class="btn btn-outline-info btn-rounded btn-block my-2 waves-effect z-depth-0 ml-2"
							style="background-color: #892c4f; color: white; border: solid 1px #892c4f; width: 95%"
							type="submit"
							:disabled="$v.$invalid || !this.image"
						>
							Sign Up
						</button>

						<p class="mb-0">
							Already have an account?
							<router-link to="/login" tag="a">Sign in</router-link>
						</p>

						<!-- Social register -->
						<!-- <p>or sign up with:</p>

						<a type="button" class="btn-floating btn-fb btn-sm">
							<i class="fab fa-facebook-f"></i>
						</a>
						<a type="button" class="btn-floating btn-tw btn-sm">
							<i class="fab fa-twitter"></i>
						</a>
						<a type="button" class="btn-floating btn-li btn-sm">
							<i class="fab fa-linkedin-in"></i>
						</a>
						<a type="button" class="btn-floating btn-git btn-sm">
							<i class="fab fa-github"></i>
						</a> -->

						<!-- <hr /> -->

						<!-- Terms of service -->
						<!-- <p>
							By clicking <em>Sign up</em> you agree to our
							<a href="" target="_blank">terms of service</a>
						</p> -->
					</form>

					<p v-if="message" class="error">
						{{ message }}
					</p>

					<p v-if="routeMessage" class="error">
						{{ routeMessage }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NProgress from "nprogress"
import { mapState } from "vuex"
import {
	email,
	minLength,
	maxLength,
	required,
	sameAs,
	alpha,
} from "vuelidate/lib/validators"
export default {
	name: "Register",
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			image: "",
		}
	},
	created() {
		this.$store.dispatch("setMessage", null)
	},
	validations: {
		firstName: {
			required,
			minLength: minLength(3),
			maxLength: maxLength(20),
			alpha,
		},
		lastName: {
			required,
			minLength: minLength(3),
			maxLength: maxLength(20),
			alpha,
		},
		email: {
			required,
			maxLength: maxLength(50),
			email,
		},
		password: {
			required,
			minLength: minLength(8),
			maxLength: maxLength(32),
		},
		confirmPassword: {
			same: sameAs("password"),
		},
	},
	computed: {
		...mapState(["message", "routeMessage"]),
	},
	methods: {
		upload() {
			this.image = this.$refs.image.files[0]
		},
		async register() {
			NProgress.start()
			this.$v.$touch()
			if (!this.$v.$invalid) {
				const id = Math.random()
					.toString(16)
					.slice(2)

				let formData = new FormData()

				formData.append("first_name", this.firstName)
				formData.append("last_name", this.lastName)
				formData.append("email", this.email)
				formData.append("password", this.password)
				formData.append("user_id", id)
				formData.append("profile_picture", this.image)

				try {
					await this.$store
						.dispatch("user/register", formData)
						.then(() => {
							NProgress.done()
						})
				} catch (error) {
					console.log(error)
				}
			} else {
				return
			}
		},
	},
}
</script>

<style scoped>
.form {
	position: absolute;
	top: 50%;
	left: 50%;
	min-width: 40%;
	transform: translate(-50%, -50%);
}

.error {
	color: red;
	text-align: center;
}

input {
	background-color: rgb(240, 232, 161);
	width: 90%;
}

i {
	display: inline-block;
	font-size: larger;
	margin-right: 0.5em;
	margin-left: 0.5em;
	margin-top: 0.4em;
}

button:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
