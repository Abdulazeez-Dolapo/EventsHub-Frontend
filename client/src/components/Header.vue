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
				<b-navbar-nav class="ml-auto pt-3">
					<b-nav-item-dropdown text="Search By" right class="mb-3">
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
							class="mr-sm-2 mb-3"
							placeholder="Search"
							:disabled="this.$route.name !== 'AllEvents'"
							v-model.trim="item"
							@input="search"
						></b-form-input>
					</b-nav-form>

					<b-button
						size="sm"
						class="my-sm-0 mr-3"
						style="height: 2.6em;"
						:disabled="this.$route.name !== 'AllEvents'"
						@click="search"
						>Search</b-button
					>

					<!-- <b-nav-item-dropdown right v-if="logInStatus"> -->
					<!-- <template v-slot:button-content id="image" style="">
							<em
								> -->
					<div v-if="logInStatus">
						<img
							:src="`http://localhost:5000/${user.profile_picture}`"
							alt=""
							@click="profile"
						/>
						<!-- </em>
						</template> -->
						<!-- <b-dropdown-item>Profile</b-dropdown-item> -->
						<button id="btn" @click="logout">Logout</button>
						<!-- </b-nav-item-dropdown> -->
					</div>
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
			this.$store.dispatch("user/logout")
			if (this.$route.name === "Home" || this.$route.name === "AllEvents") {
				return
			} else {
				this.$router.push({ name: "AllEvents" })
				return
			}
		},
		login() {
			this.$store.dispatch("user/logout")
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
			console.log(events)
			this.$store.dispatch("event/searchedEvents", events)
			console.log(this.searchedEvents)
		},
	},
}
</script>

<style scoped>
h1:hover {
	cursor: pointer;
}

img {
	height: 2.5em;
	width: 2.8em;
	border-radius: 50%;
	margin-top: 0;
}

img:hover {
	cursor: pointer;
}

#btn {
	border: none;
	background-color: inherit;
	color: white;
	margin-bottom: 1em;
}
</style>
