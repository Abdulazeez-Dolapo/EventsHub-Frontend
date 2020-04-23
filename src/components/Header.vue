<template>
	<div>
		<b-navbar
			toggleable="lg"
			type="dark"
			style="background-color: #892c4f;"
			fixed="top"
			class="py-0 my-0"
		>
			<b-navbar-brand to="/" style="font-size: 2em"
				>EventsHub</b-navbar-brand
			>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/events" style="font-size: 1.3em"
						>Events</b-nav-item
					>
					<b-nav-item
						v-if="logInStatus"
						@click="create"
						style="font-size: 1.3em"
						>Create Event</b-nav-item
					>
					<b-nav-item
						v-if="!logInStatus"
						@click="login"
						style="font-size: 1.3em"
						>Get Started</b-nav-item
					>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto py-0 my-0">
					<b-nav-item-dropdown text="Search by" right>
						<b-dropdown-item value="title" @click="choose($event)"
							>title</b-dropdown-item
						>
						<b-dropdown-item value="category" @click="choose($event)"
							>category</b-dropdown-item
						>
						<b-dropdown-item value="location" @click="choose($event)"
							>location</b-dropdown-item
						>
					</b-nav-item-dropdown>
					<b-nav-form>
						<b-form-input
							size="sm"
							class="mr-sm-2"
							placeholder="Search"
							:disabled="this.$route.name !== 'AllEvents'"
							v-model.trim="item"
							@input="search"
						></b-form-input>
						<b-button
							size="sm"
							class="my-0 my-sm-0"
							:disabled="this.$route.name !== 'AllEvents'"
							@click="search"
							>Search</b-button
						>
					</b-nav-form>

					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template
							v-slot:button-content
							v-if="logInStatus"
							class="py-0 my-0"
						>
							<img
								:src="
									`https://eventshub-express.herokuapp.com/${user.profile_picture}`
								"
								alt=""
							/>
						</template>
						<b-dropdown-item to="/profile">Profile</b-dropdown-item>
						<b-dropdown-item @click="logout">Logout</b-dropdown-item>
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
			searchBy: "title",
			item: "",
		}
	},
	watch: {
		$route(to, from) {
			this.item = ""
			this.$store.dispatch("event/searchedEvents", null)
		},
	},
	computed: {
		...mapState({
			logInStatus: state => state.user.logInStatus,
			user: state => state.user.user,
			allEvents: state => state.event.allEvents,
			searchedEvents: state => state.event.searchedEvents,
		}),
	},
	methods: {
		logout() {
			this.$store.dispatch("user/logout").then(() => {
				if (
					this.$route.name === "Home" ||
					this.$route.name === "AllEvents"
				) {
					console.log("header")
					return
				} else {
					this.$router.push({ name: "AllEvents" })
					console.log("header")
					return
				}
			})
		},
		create() {
			this.$router.push({ name: "Create-Event" })
		},
		login() {
			this.$store.dispatch("user/logout")
			this.$router.push({ name: "Login" })
		},
		choose(e) {
			this.searchBy = e.target.innerText
			this.search()
		},
		startSearch(by, item) {
			const searchedEvents = []
			this.allEvents.forEach(event => {
				if (event[by.trim()].includes(item.trim())) {
					searchedEvents.push(event)
				}
			})
			return searchedEvents
		},
		search() {
			const events = this.startSearch(this.searchBy, this.item)
			this.$store.dispatch("event/searchedEvents", events)
		},
	},
}
</script>

<style scoped>
.header {
	font-family: helvetica, "Times New Roman", Times, serif;
	font-weight: bolder;
	z-index: 1;
}
h1:hover {
	cursor: pointer;
}

img {
	height: 2.2em;
	width: 2.2em;
	border-radius: 50%;
}

img:hover {
	cursor: pointer;
}
</style>
