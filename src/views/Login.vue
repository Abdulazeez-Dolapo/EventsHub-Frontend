<template>
	<div class="login">
		<div class="form">
			<div class="card" style="border: solid 1px  #892c4f;">
				<h5
					class="card-header info-color white-text text-center py-3 mb-3"
					style="background-color: #892c4f; color: white"
				>
					<strong>Login</strong>
				</h5>
				<div class="card-body px-lg-3 pt-0">
					<!-- Form -->
					<form
						@submit.prevent="login"
						class="text-center"
						style="color: black;"
					>
						<!-- Email -->
						<div class="md-form">
							<!-- <label for="materialLoginFormEmail">E-mail</label> -->
							<div style="display: flex">
								<i class="fas fa-envelope-square"></i>
								<input
									placeholder="email"
									v-model="email"
									type="text"
									id="materialLoginFormEmail"
									class="form-control mb-3"
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
						<div class="md-form">
							<!-- <label for="materialLoginFormPassword">Password</label> -->
							<div style="display: flex" class="mb-1">
								<i class="fas fa-lock"></i>
								<input
									v-model="password"
									placeholder="password"
									type="password"
									id="materialLoginFormPassword"
									class="form-control"
									:class="{ 'border-danger': $v.password.$error }"
									@blur="$v.password.$touch()"
								/>
							</div>
							<div v-if="$v.password.$error" class="error">
								<p v-if="!$v.password.required">
									Password is required
								</p>
							</div>
						</div>

						<!-- Forgot password -->
						<div class="d-flex justify-content-around">
							<div>
								<a href="">Forgot password?</a>
							</div>
						</div>

						<!-- Sign in button -->
						<button
							style="background-color: #892c4f; color: white;"
							class="btn btn-outline-info btn-rounded btn-block my-2 mx-2 waves-effect z-depth-0"
							type="submit"
							:disabled="$v.$invalid"
						>
							Login
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
import NProgress from "nprogress"

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
				NProgress.start()
				const userInfo = {
					email: this.email,
					password: this.password,
				}
				try {
					await this.$store.dispatch("user/login", userInfo)
					NProgress.done()
				} catch (error) {
					// this.password = null
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
	position: absolute;
	top: 50%;
	left: 50%;
	width: 30%;
	transform: translate(-50%, -50%);
}

button {
	border: solid 1px #892c4f;
	width: 95%;
	font-weight: bolder;
}

button:hover {
	border: solid 1px #5f112f;
}

input {
	background-color: rgb(240, 232, 161);
	width: 90%;
}

i {
	display: inline-block;
	font-size: larger;
	margin-right: 0.5em;
	margin-top: 0.4em;
}

@media screen and (min-width: 200px) and (max-width: 400px) {
	.form {
		width: 80%;
	}
}

@media screen and (min-width: 401px) and (max-width: 540px) {
	.form {
		width: 70%;
	}
}

@media screen and (min-width: 541px) and (max-width: 720px) {
	.form {
		width: 50%;
	}
}
</style>
