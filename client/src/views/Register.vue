<template>
	<div class="register">
		<div class="form">
			<div class="card" style="border: solid 1px  #17a2bb;">
				<h5
					class="card-header info-color white-text text-center py-3"
					style="background-color: #17a2bb; color: white;"
				>
					<strong>Sign up</strong>
				</h5>

				<div class="card-body px-lg-5 pt-0 mt-2">
					<form
						@submit.prevent="register"
						class="text-center"
						style="color: #757575;"
						enctype="multipart/form-data"
					>
						<div class="form-row">
							<div class="col">
								<!-- First name -->
								<div class="md-form">
									<input
										type="text"
										id="materialRegisterFormFirstName"
										v-model="firstName"
										class="form-control"
										:class="{ 'border-danger': $v.firstName.$error }"
										@blur="$v.firstName.$touch()"
									/>
									<label for="materialRegisterFormFirstName"
										>First name</label
									>

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
									<input
										type="text"
										id="materialRegisterFormLastName"
										v-model="lastName"
										class="form-control"
										:class="{ 'border-danger': $v.lastName.$error }"
										@blur="$v.lastName.$touch()"
									/>
									<label for="materialRegisterFormLastName"
										>Last name</label
									>

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
						<div class="md-form mt-0">
							<input
								type="email"
								id="materialRegisterFormEmail"
								v-model="email"
								class="form-control"
								:class="{ 'border-danger': $v.email.$error }"
								@blur="$v.email.$touch()"
							/>
							<label for="materialRegisterFormEmail">E-mail</label>

							<div v-if="$v.email.$error" class="error">
								<p v-if="!$v.email.email">Please enter a valid email</p>
								<p v-if="!$v.email.required">
									Email is required
								</p>
							</div>
						</div>

						<!-- Password -->
						<div class="md-form">
							<input
								type="password"
								id="materialRegisterFormPassword"
								aria-describedby="materialRegisterFormPasswordHelpBlock"
								v-model="password"
								class="form-control"
								:class="{ 'border-danger': $v.password.$error }"
								@blur="$v.password.$touch()"
							/>
							<label for="materialRegisterFormPassword">Password</label>

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
						<div class="md-form">
							<input
								type="password"
								id="materialRegisterFormPhone"
								class="form-control"
								aria-describedby="materialRegisterFormPasswordHelpBlock"
								v-model="confirmPassword"
								:class="{ 'border-danger': $v.confirmPassword.$error }"
								@blur="$v.confirmPassword.$touch()"
							/>
							<label for="materialRegisterFormPhone"
								>Confirm password</label
							>

							<div v-if="$v.confirmPassword.$error" class="error">
								<p v-if="!$v.confirmPassword.same">
									Passwords should match
								</p>
							</div>
						</div>

						<div class="form-group">
							<input
								type="file"
								class="form-control-file"
								id="exampleFormControlFile1"
								ref="image"
								accept="image/jpeg image/jpg image/png"
								@change="upload"
							/>
							<label for="exampleFormControlFile1"
								>Upload your profile picture</label
							>
						</div>

						<!-- Sign up button -->
						<button
							class="btn btn-outline-info btn-rounded btn-block my-2 waves-effect z-depth-0"
							type="submit"
							:disabled="$v.$invalid"
						>
							Sign Up
						</button>

						<p>
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
		...mapState(["message"]),
	},
	methods: {
		upload() {
			this.image = this.$refs.image.files[0]
		},
		async register() {
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
					await this.$store.dispatch("user/register", formData)
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
	min-width: 40%;
	margin: 0 28%;
	margin-top: 7%;
}
.error {
	color: red;
}

button:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
