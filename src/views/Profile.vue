<template>
	<div class="profile">
		<div class="container-fluid">
			<div class="row">
				<!-- Sidebar -->
				<div class="col-md-2 bg-light d-none d-md-block sidebar">
					<div class="left-sidebar py-3">
						<ul class="nav flex-column sidebar-nav">
							<li class="nav-item">
								<a href="" class="nav-link active">
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
									<p>
										Account information
									</p>
								</a>
							</li>
							<!-- <li class="nav-item">
								<a href="" class="nav-link active">
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
								</a>
							</li> -->
							<!-- <li class="nav-item">
								<a href="" class="nav-link active">
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
									{{ user.email }}
								</a>
							</li> -->
							<li class="nav-item">
								<a href="" class="nav-link active">
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
									<p>Events Created: {{ userCreatedLength }}</p>
								</a>
							</li>
							<li class="nav-item">
								<a href="" class="nav-link active">
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
									<p>Events Booked: {{ userBookedLength }}</p>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 py-5">
					<h1>Welcome {{ user.first_name }}</h1>
					<hr />

					<h3>Invoices</h3>
					<hr />
					<div class="row">
						<div
							v-for="event in sampleBooked"
							:key="event.event_id"
							@click="viewEvent(event.event_id)"
							class="card mb-3 pt-2 col-sm-6"
						>
							<div class="card-body pt-1 pb-0">
								<h3 class="card-title pt-0">
									<i class="fas fa-cube mr-3"></i>{{ event.title }}
								</h3>
								<p class="card-text">
									<i class="fas fa-users mr-3"></i
									>{{ event.number_attending }} attending
								</p>
							</div>
							<div class="card-footer py-2">
								<p class="card-text">
									<i class="far fa-calendar-alt mr-4"></i
									>{{ formatDate(event.date) }}
									<i class="far fa-clock ml-3 mr-1"></i
									>{{ formatTime(event.time) }}
								</p>
								<p>
									<i class="fas fa-map-marker-alt mr-4"></i
									>{{ event.location }}
								</p>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-sm-6">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Invoice #184389</h5>
									<p class="card-text">
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Fugiat harum debitis animi iure
										maiores eius, facilis ipsa doloremque minima
										necessitatibus exercitationem magni numquam
										beatae, illo eveniet amet sint? Mollitia, iste.
									</p>
									<a href="" class="btn btn-primary">Print</a>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Invoice #184391</h5>
									<p class="card-text">
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Fugiat harum debitis animi iure
										maiores eius, facilis ipsa doloremque minima
										necessitatibus exercitationem magni numquam
										beatae, illo eveniet amet sint? Mollitia, iste.
									</p>
									<a href="" class="btn btn-primary">Print</a>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
	<!-- <div class="left">
			<h2 style="text-align: center;">
				PROFILE
			</h2>
			<div>
				<ul>
					<li>
						{{ user.first_name }}
					</li>
					<li>
						{{ user.last_name }}
					</li>
					<li>
						{{ user.email }}
					</li>
				</ul>
			</div>
			<div>
				<ul style="cursor: pointer;">
					<li @click="showEventsCreated">
						Total Events Created: {{ userCreated.length }}
					</li>
					<li @click="showEventsToAttend">
						Total Events Booked: {{ userBooked.length }}
					</li>
				</ul>
			</div>
		</div>

		<div class="right" v-if="show">
			<div v-if="showCreated">
				<h2 style="text-align: center;">
					EVENTS YOU CREATED
				</h2>
				<div v-if="!userCreated.length">
					You have not created any events. Click on this
					<router-link to="/create-event">link</router-link> to create one
				</div>
				<div
					style="width: 100%;"
					v-for="event in userCreated"
					:key="event.event_id"
				>
					<ul style="width: 85%; cursor: pointer; display: inline-block;">
						<li @click="navigateToEvent(event.event_id)">
							{{ event.title }}
						</li>
					</ul>
					<i
						id="edit"
						@click="edit(event.event_id)"
						class="fas fa-pencil-alt"
					></i> -->
	<!-- <i class="fas fa-pencil-alt"></i> -->
	<!-- </div>
			</div>
			<div v-if="showAttendance">
				<h2 style="text-align: center;">
					EVENTS TO ATTEND
				</h2>
				<div v-if="!userBooked.length">
					You have not booked any events. Click on this
					<router-link to="/events">link</router-link> to book one
				</div>
				<ul
					style="cursor: pointer;"
					v-for="event in userBooked"
					:key="event.id"
				>
					<li @click="navigateToEvent(event.event_id)">
						{{ event.event_title }}
					</li>
				</ul>
			</div>
		</div>
	</div> -->
</template>

<script>
import { mapState } from "vuex"
import { timeMixin } from "../mixins/formatTime"
import { dateMixin } from "../mixins/formatDate"

export default {
	mixins: [timeMixin, dateMixin],
	computed: {
		...mapState({
			user: state => state.user.user,
			userBooked: state => state.event.userEvents,
			userCreated: state => state.event.userCreatedEvents,
			userBookedLength: () => this.userBooked.length,
			userCreatedLength: () => this.userCreated.length,
		}),
	},
	created() {
		this.sampleBooked = this.userBooked.slice(0, 2)
		this.sampleCreated = this.userCreated.slice(0, 2)
	},
	data() {
		return {
			show: false,
			showCreated: false,
			showAttendance: false,
			sampleCreated: null,
			sampleBooked: null,
		}
	},
	methods: {
		showEventsCreated() {
			this.show = true
			this.showCreated = true
			this.showAttendance = false
		},
		showEventsToAttend() {
			this.show = true
			this.showCreated = false
			this.showAttendance = true
		},
		navigateToEvent(id) {
			this.$router.push(`event/${id}`)
		},
		edit(id) {
			this.$router.push(`edit-event/${id}`)
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
