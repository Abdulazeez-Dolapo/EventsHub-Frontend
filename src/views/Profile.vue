<template>
	<div class="profile">
		<div class="container-fluid">
			<div class="row">
				<!-- Sidebar -->
				<div class="col-md-2 bg-light d-none d-md-block sidebar">
					<div class="left-sidebar py-3">
						<ul class="nav flex-column sidebar-nav">
							<li class="nav-item">
								<p class="nav-link active">
									<svg
										class="bi bi-chevron-right"
										width="16"
										height="16"
										viewBox="0 0 20 20"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
											clip-rule="evenodd"
										/>
									</svg>
									{{ user.first_name }}
								</p>
							</li>
							<li class="nav-item">
								<p class="nav-link active">
									<svg
										class="bi bi-chevron-right"
										width="16"
										height="16"
										viewBox="0 0 20 20"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
											clip-rule="evenodd"
										/>
									</svg>
									{{ user.last_name }}
								</p>
							</li>
							<li class="nav-item">
								<p class="nav-link active">
									<svg
										class="bi bi-chevron-right"
										width="16"
										height="16"
										viewBox="0 0 20 20"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
											clip-rule="evenodd"
										/>
									</svg>
									<span @click="showAllCreated" class="click"
										>Events Created: {{ userCreated.length }}</span
									>
								</p>
							</li>
							<li class="nav-item">
								<p class="nav-link active">
									<svg
										class="bi bi-chevron-right"
										width="16"
										height="16"
										viewBox="0 0 20 20"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
											clip-rule="evenodd"
										/>
									</svg>
									<span @click="showAllBooked" class="click"
										>Events Booked: {{ userBooked.length }}</span
									>
								</p>
							</li>
						</ul>
					</div>
				</div>

				<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 py-5">
					<h1>Welcome {{ user.first_name }}</h1>
					<hr />

					<h2 @click="showAllCreated">Events Created</h2>
					<hr />
					<div class="row">
						<div v-if="!userCreated.length">
							You have not created any events. Click on this
							<router-link to="/create-event">link</router-link> to
							create one
						</div>
						<div
							v-for="event in sampleCreated"
							:key="event.event_id"
							class="col-sm-6"
						>
							<div class="card">
								<div class="card-body pt-1 pb-0">
									<h3 class="card-title pt-0">
										<span @click.self="viewEvent(event.event_id)">
											<i class="fas fa-cube mr-3"></i
											>{{ event.title }}
										</span>
										<button
											@click="edit(event.event_id)"
											style="float: right;"
										>
											<i
												id="edit"
												class="fas fa-pencil-alt mt-1"
											></i>
										</button>
									</h3>
									<p class="card-text">
										<i class="fas fa-users mr-3"></i
										>{{ event.number_attending }} attending
									</p>
								</div>
								<div
									class="card-footer pt-2 pb-0"
									@click="viewEvent(event.event_id)"
								>
									<p class="card-text my-0">
										<i class="far fa-calendar-alt mr-4"></i
										>{{ formatDate(event.date) }}
										<i class="far fa-clock ml-3 mr-1"></i
										>{{ formatTime(event.time) }}
									</p>
									<p style="display: block;" class="mb-1">
										<i
											class="fas fa-map-marker-alt mr-4 py-0 my-0"
										></i
										>{{ event.location }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<hr />

					<h2 @click="showAllBooked">Events Booked</h2>
					<hr />
					<div class="row">
						<div v-if="!userBooked.length">
							You have not booked any events. Click on this
							<router-link to="/events">link</router-link> to book one
						</div>
						<div
							class="col-sm-6"
							v-for="event in sampleBooked"
							:key="event.event_id"
						>
							<div class="card my-2">
								<div class="card-body">
									<h3
										class="card-title"
										@click="navigateToEvent(event.event_id)"
									>
										{{ event.event_title }}
									</h3>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { timeMixin } from "../mixins/formatTime"
import { dateMixin } from "../mixins/formatDate"

export default {
	mixins: [timeMixin, dateMixin],
	created() {
		this.sampleCreated = this.userCreated.slice(0, 2)
		this.sampleBooked = this.userBooked.slice(0, 2)
	},
	computed: {
		...mapState({
			user: state => state.user.user,
			userBooked: state => state.event.userEvents,
			userCreated: state => state.event.userCreatedEvents,
		}),
	},
	data() {
		return {
			show: false,
			showCreated: false,
			showBooked: false,
			sampleCreated: null,
			sampleBooked: null,
		}
	},
	methods: {
		navigateToEvent(id) {
			this.$router.push(`event/${id}`)
		},
		edit(id) {
			this.$router.push(`edit-event/${id}`)
		},
		viewEvent(id) {
			this.$router.push(`event/${id}`)
		},
		showAllCreated() {
			this.showCreated = !this.showCreated
			if (this.showCreated) {
				this.sampleCreated = this.userCreated
			} else {
				this.sampleCreated = this.userCreated.slice(0, 2)
			}
		},
		showAllBooked() {
			this.showBooked = !this.showBooked
			if (this.showBooked) {
				this.sampleBooked = this.userBooked
			} else {
				this.sampleBooked = this.userBooked.slice(0, 2)
			}
		},
	},
	beforeDestroy() {
		this.$store.dispatch("setMessage", null)
	},
}
</script>

<style scoped>
.form-control-primary {
	margin: 10px;
	opacity: 0.2;
	border-radius: 2px;
}

p {
	display: inline-block;
}

.sidebar {
	position: fixed;
	left: 0;
	bottom: 0;
	top: 0;
	z-index: 100;
	padding: 70px 0 0 10px;
	border-right: 1px solid #d3d3d3;
}

.left-sidebar {
	position: sticky;
	top: 0;
	height: calc(100vh - 70px);
}

.sidebar-nav li .nav-link {
	color: #333;
	font-weight: 500;
}

main {
	padding-top: 90px;
}

main .card {
	margin-bottom: 20px;
}

.card:hover {
	cursor: pointer;
}

button {
	z-index: 200;
}

h2:hover,
.click:hover {
	cursor: pointer;
}
/* .profile {
	display: flex;
	flex-direction: row;
	width: 100%;
	min-height: 92vh;
	background-color: #c27995;
}

#edit {
	font-size: 2.3em;
}

#edit:hover {
	cursor: pointer;
}

.left {
	width: 48%;
	margin: 5px 5px;
}

.right {
	width: 48%;
	margin: 5px 5px;
}

li {
	border: solid black 2px;
	margin-top: 1em;
	list-style: none;
	padding: 0.5em;
}
button {
	margin-left: 0.6em;
	height: 2.8em;
	width: 11%;
} */
</style>
