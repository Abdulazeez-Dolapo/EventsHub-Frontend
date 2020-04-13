<template>
	<div class="login">
		<div class="form">
			<div class="card" style="border: none;">
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
						style="color: #757575;"
						action="#!"
					>
						<!-- Email -->
						<div class="md-form">
							<input
								v-model="email"
								type="text"
								id="materialLoginFormEmail"
								class="form-control"
							/>
							<label for="materialLoginFormEmail">E-mail</label>
						</div>

						<!-- Password -->
						<div class="md-form">
							<input
								v-model="password"
								type="password"
								id="materialLoginFormPassword"
								class="form-control"
							/>
							<label for="materialLoginFormPassword">Password</label>
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
import { mapState } from "vuex"
export default {
	name: "Register",
	data() {
		return {
			email: "",
			password: ""
		}
	},
	computed: {
		...mapState(["message", "routeMessage"])
	},
	methods: {
		async login() {
			const userInfo = {
				email: this.email,
				password: this.password
			}
			try {
				await this.$store.dispatch("login", userInfo)
			} catch (error) {
				console.log(error)
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$store.state.routeMessage = null
		next()
	}
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
	margin-top: 5%;
	position: absolute;
}

button:hover {
	border: solid 1px #892c4f;
	background-color: #892c4f;
}
</style>
