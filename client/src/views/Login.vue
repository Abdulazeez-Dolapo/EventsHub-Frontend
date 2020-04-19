<template>
	<div class="login">
		<div class="form">
			<div class="card" style="border: solid 1px  #17a2bb;">
				<h5
					class="card-header info-color white-text text-center py-3 mb-3"
					style="background-color: #17a2bb; color: white"
				>
					<strong>Sign in</strong>
				</h5>
				<div class="card-body px-lg-5 pt-0">
					<!-- Form -->
					<form
						@submit.prevent="login"
						class="text-center"
						style="color: #757575; "
					>
						<!-- Email -->
						<div class="md-form">
							<input
								v-model="email"
								type="text"
								id="materialLoginFormEmail"
								class="form-control"
								:class="{ 'border-danger': $v.email.$error }"
								@blur="$v.email.$touch()"
							/>
							<label for="materialLoginFormEmail">E-mail</label>
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
								v-model="password"
								type="password"
								id="materialLoginFormPassword"
								class="form-control"
								:class="{ 'border-danger': $v.password.$error }"
								@blur="$v.password.$touch()"
							/>
							<label for="materialLoginFormPassword">Password</label>
							<div v-if="$v.password.$error" class="error">
								<p v-if="!$v.password.required">
									Password is required
								</p>
							</div>
						</div>

						<div class="d-flex justify-content-around">
							<div>
								<!-- Remember me -->
								<div class="form-check">
									<input
										type="checkbox"
										class="form-check-input"
										id="materialLoginFormRemember"
									/>
									<label
										class="form-check-label"
										for="materialLoginFormRemember"
										>Remember me</label
									>
								</div>
							</div>
							<div>
								<!-- Forgot password -->
								<a href="">Forgot password?</a>
							</div>
						</div>

						<!-- Sign in button -->
						<button
							class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
							type="submit"
							:disabled="$v.$invalid"
						>
							Sign in
						</button>

						<!-- Register -->
						<p>
							Not a member?
							<router-link to="/register" tag="a">Sign up</router-link>
						</p>
					</form>
					<!-- Form -->

					<p v-if="routeMessage" class="error">
						{{ routeMessage }}
					</p>

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
import { required, email, maxLength } from "vuelidate/lib/validators"

export default {
	name: "Register",
	data() {
		return {
			email: "",
			password: "",
		}
	},
	computed: {
		...mapState(["routeMessage", "message"]),
	},
	created() {
		this.$store.dispatch("setMessage", null)
	},
	validations: {
		email: {
			required,
			email,
			maxLength: maxLength(40),
		},
		password: {
			required,
			maxLength: maxLength(32),
		},
	},
	methods: {
		async login() {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				const userInfo = {
					email: this.email,
					password: this.password,
				}
				try {
					await this.$store.dispatch("user/login", userInfo)
				} catch (error) {
					this.password = null
					console.log(error)
				}
			} else {
				return
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch("setRouteMessage", null)
		next()
	},
}
</script>

<style scoped>
.error {
	font-size: 1em;
	color: rgb(245, 13, 13);
	margin: 0 auto;
	text-align: center;
}

.form {
	width: 35%;
	margin: 0 30%;
	margin-top: 10%;
}

button:hover {
	border: solid 1px #892c4f;
	background-color: #892c4f;
}
</style>
