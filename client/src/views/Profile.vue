<template>
	<div class="profile">
		<div class="left">
			<div v-if="messageAlert" class="notification">
				{{ messageAlert }}
			</div>
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
					<li @click="showEventsToAttend">
						Events to Attend
					</li>
					<li @click="showEventsCreated">
						Events You created
					</li>
				</ul>
			</div>
		</div>

		<div class="right" v-if="show">
			<div v-if="showCreated">
				<h2 style="text-align: center;">
					EVENTS YOU CREATED
				</h2>
				<div
					style="width: 100%;"
					v-for="event in userCreatedEvents"
					:key="event.event_id"
				>
					<ul style="width: 85%; cursor: pointer; display: inline-block;">
						<li @click="navigateToEvent(event.event_id)">
							{{ event.title }}
						</li>
					</ul>
					<button @click="edit(event.event_id)">
						<i class="fas fa-edit"></i>
					</button>
				</div>
			</div>
			<div v-if="showAttendance">
				<h2 style="text-align: center;">
					EVENTS TO ATTEND
				</h2>
				<ul
					style="cursor: pointer;"
					v-for="event in userEvents"
					:key="event.id"
				>
					<li @click="navigateToEvent(event.event_id)">
						{{ event.event_title }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"

export default {
	created() {
		this.clearMessage()
	},
	computed: {
		...mapState(["user", "userEvents", "userCreatedEvents"])
	},
	data() {
		return {
			show: false,
			showCreated: false,
			showAttendance: false,
			messageAlert: this.$store.state.message
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
		clearMessage() {
			setTimeout(() => {
				this.messageAlert = null
				this.$store.state.message = null
			}, 2000)
		}
	}
}
</script>

<style scoped>
.profile {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	background-color: teal;
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
}
</style>
