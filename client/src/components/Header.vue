<template>
	<div class="header" style="margin-bottom: 2rem;">
		<b-navbar
			class="mb-5"
			toggleable="lg"
			type="dark"
			fixed="top"
			style="background-color: #17a2bb; height: 10%;"
		>
			<b-navbar-brand
				><h1 @click="goHome" style="color: #fff;">
					EventsHub
				</h1>
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item>About</b-nav-item>
					<b-nav-item @click="events">Events</b-nav-item>
					<b-nav-item v-if="logInStatus" @click="createEvent"
						>Create event</b-nav-item
					>
					<b-nav-item @click="login" v-if="!logInStatus"
						>Get Started</b-nav-item
					>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown text="Search By" right>
						<b-dropdown-item value="location" @click="choose($event)"
							>location</b-dropdown-item
						>
						<b-dropdown-item value="title" @click="choose($event)"
							>title</b-dropdown-item
						>
						<b-dropdown-item value="category" @click="choose($event)"
							>category</b-dropdown-item
						>
					</b-nav-item-dropdown>

					<b-nav-form>
						<b-form-input
							size="sm"
							class="mr-sm-2"
							placeholder="Search"
						></b-form-input>
					</b-nav-form>

					<b-button
						size="sm"
						class="my-2 my-sm-0 mr-3"
						:disabled="this.$route.name !== 'AllEvents'"
						@click="search"
						>Search</b-button
					>

					<b-nav-item-dropdown right v-if="logInStatus">
						<template v-slot:button-content>
							<em>{{ user.first_name }}</em>
						</template>
						<b-dropdown-item @click="profile">Profile</b-dropdown-item>
						<b-dropdown-item @click="logout">Log Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	name: "Header",
	data() {
		return {
			searchBy: ""
		}
	},
	computed: {
		...mapState(["logInStatus", "user"])
	},
	methods: {
		logout() {
			this.$store.dispatch("logout")
			if (this.$route.name === "Home" || this.$route.name === "AllEvents") {
				return
			} else {
				this.$router.push({ name: "AllEvents" })
				return
			}
		},
		login() {
			this.$store.dispatch("logout")
			this.$router.push({ name: "Login" })
		},
		events() {
			this.$router.push({ name: "AllEvents" })
		},
		createEvent() {
			this.$router.push({ name: "Create-Event" })
		},
		goHome() {
			this.$router.push({ name: "Home" })
		},
		profile() {
			this.$router.push({ name: "Profile" })
		},
		choose(e) {
			this.searchBy = e.target.innerText
		},
		search() {
			// alert(this.searchBy)
		}
	}
}
</script>

<style scoped>
h1:hover {
	cursor: pointer;
}
</style>
