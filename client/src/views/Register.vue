<template>
	<div class="register">
		<div class="form">
			<div class="card" style="border: none">
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
					>
						<div class="form-row">
							<div class="col">
								<!-- First name -->
								<div class="md-form">
									<input
										type="text"
										id="materialRegisterFormFirstName"
										class="form-control"
										v-model="firstName"
									/>
									<label for="materialRegisterFormFirstName"
										>First name</label
									>
								</div>
							</div>
							<div class="col">
								<!-- Last name -->
								<div class="md-form">
									<input
										type="email"
										id="materialRegisterFormLastName"
										class="form-control"
										v-model="lastName"
									/>
									<label for="materialRegisterFormLastName"
										>Last name</label
									>
								</div>
							</div>
						</div>

						<!-- E-mail -->
						<div class="md-form mt-0">
							<input
								type="email"
								id="materialRegisterFormEmail"
								class="form-control"
								v-model="email"
							/>
							<label for="materialRegisterFormEmail">E-mail</label>
						</div>

						<!-- Password -->
						<div class="md-form">
							<input
								type="password"
								id="materialRegisterFormPassword"
								class="form-control"
								aria-describedby="materialRegisterFormPasswordHelpBlock"
								v-model="password"
							/>
							<label for="materialRegisterFormPassword">Password</label>
						</div>

						<!-- Confirm password -->
						<div class="md-form">
							<input
								type="password"
								id="materialRegisterFormPhone"
								class="form-control"
								aria-describedby="materialRegisterFormPasswordHelpBlock"
								v-model="confirmPassword"
							/>
							<label for="materialRegisterFormPhone"
								>Confirm password</label
							>
						</div>

						<!-- Sign up button -->
						<button
							class="btn btn-outline-info btn-rounded btn-block my-2 waves-effect z-depth-0"
							type="submit"
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

						<hr />

						<!-- Terms of service -->
						<p>
							By clicking <em>Sign up</em> you agree to our
							<a href="" target="_blank">terms of service</a>
						</p>
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
export default {
	name: "Register",
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	},
	computed: {
		error() {
			return this.$store.state.message
		}
	},
	methods: {
		async register() {
			const id = Math.random()
				.toString(16)
				.slice(2)

			const userInfo = {
				first_name: this.firstName,
				last_name: this.lastName,
				email: this.email,
				password: this.password,
				user_id: id
			}
			try {
				await this.$store.dispatch("register", userInfo)
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style scoped>
.form {
	width: 40%;
	margin: 0 28%;
	margin-top: 3%;
	position: absolute;
}
.error {
	color: red;
}

button:hover {
	background-color: #892c4f;
	border: solid 1px #892c4f;
}
</style>
