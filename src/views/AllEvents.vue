<template>
	<div class="all-events">
		<div class="all-cards">
			<div class="card" v-if="showError" id="search">
				<h2>
					No results found
				</h2>
			</div>
			<h1 v-else>
				Events Listing
			</h1>
			<div
				v-for="event in pagedEvents"
				:key="event.event_id"
				@click="viewEvent(event.event_id)"
				class="card mb-3 pt-2"
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
						<i class="fas fa-map-marker-alt mr-4"></i>{{ event.location }}
					</p>
				</div>
			</div>
			<div class="nav" v-if="!showError">
				<button :disabled="!showPrev" @click="prev">
					<i class="fas fa-angle-double-left"></i>
				</button>
				<button :disabled="!showNext" @click="next">
					<i class="fas fa-angle-double-right"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { timeMixin } from "../mixins/formatTime"
import { dateMixin } from "../mixins/formatDate"

export default {
	name: "AllEvents",
	props: {
		sentEvents: {
			type: Array,
			required: true,
		},
	},
	created() {
		if (this.savedEnd && this.savedStart && this.savedPage) {
			this.start = this.savedStart
			this.end = this.savedEnd
			this.page = this.savedPage
		}
		this.showPrev = false
		this.paginate(this.start, this.end)
	},
	mixins: [dateMixin, timeMixin],
	data() {
		return {
			events: this.sentEvents,
			pagedEvents: null,
			page: 1,
			start: 0,
			end: 5,
			showPrev: true,
			showNext: true,
			showError: false,
		}
	},
	watch: {
		page() {
			this.paging()
		},
		searchedEvents() {
			this.start = 0
			this.end = 5
			this.paginate(this.start, this.end)
			this.paging()
			this.page = 1
			if (this.searchedEvents != null) {
				if (this.searchedEvents.length <= 0) {
					this.showError = true
				} else {
					this.showError = false
				}
			}
		},
	},
	computed: {
		...mapState({
			logInStatus: state => state.user.logInStatus,
			searchedEvents: state => state.event.searchedEvents,
			savedPage: state => state.savedPage,
			savedStart: state => state.savedStart,
			savedEnd: state => state.savedEnd,
		}),
	},
	methods: {
		viewEvent(id) {
			this.$router.push({ path: `event/${id}` })
		},
		paginate(start, end) {
			let eventList
			if (this.searchedEvents) {
				eventList = this.searchedEvents
			} else {
				eventList = this.events
			}
			const pagedEvents = eventList.slice(start, end)
			this.pagedEvents = pagedEvents
		},
		next() {
			this.start = this.start + 5
			this.end = this.end + 5
			this.page++
			this.paginate(this.start, this.end)
			this.scrollToTop()
		},
		prev() {
			this.start = this.start - 5
			this.end = this.end - 5
			this.page--
			this.paginate(this.start, this.end)
			this.scrollToTop()
		},
		scrollToTop() {
			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			})
		},
		paging() {
			let maxPageNumber
			if (this.searchedEvents) {
				maxPageNumber = Math.ceil(this.searchedEvents.length / 5)
			} else {
				maxPageNumber = Math.ceil(this.events.length / 5)
			}
			if (maxPageNumber == 1) {
				this.showPrev = false
				this.showNext = false
			} else if (this.page == 1) {
				this.showPrev = false
				this.showNext = true
			} else if (this.page == maxPageNumber) {
				this.showPrev = true
				this.showNext = false
			} else {
				this.showPrev = true
				this.showNext = true
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		if (to.name == "Event") {
			const info = {
				start: this.start,
				end: this.end,
				page: this.page,
			}
			this.$store.dispatch("savePageInfo", info)
			next()
		}
		next()
	},
}
</script>
<style scoped>
.all-events {
	background-color: #c27995;
	min-height: 92vh;
	width: 100%;
	padding-top: 1em;
	padding-bottom: 0;
	justify-content: center;
	font-family: "Baloo Bhaina 2", cursive;
}

#search {
	height: 6%;
	box-sizing: content-box;
	padding-top: 0.8em;
	text-align: center;
}

.all-cards {
	margin: 0 auto;
	height: 100%;
	width: 50%;
}

.card {
	position: relative;
	border-radius: 10px;
	line-height: 1.3;
	padding: 0;
	width: 100%;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease-in-out;
}

p {
	font-size: 1.3em;
	margin: 0;
}

h3 {
	margin: 0;
	padding: 0;
}

/* Scale up the box */
.card:hover {
	transform: scale(1.01, 1.05);
	cursor: pointer;
}

.card::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;
	height: 100%;
	opacity: 0;
	border-radius: 5px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	transition: opacity 0.3s ease-in-out;
}

/* Fade in the pseudo-element with the bigger shadow */
.card:hover::after {
	opacity: 1;
}

.nav {
	justify-content: center;
	margin: 0 auto;
	padding-bottom: 0.5em;
}

.nav button {
	border: none;
	margin-right: 0.1em;
	width: 2em;
	font-size: 2em;
	background-color: inherit;
}

@media screen and (min-width: 200px) and (max-width: 720px) {
	.all-cards {
		margin: 0 auto;
		width: 80%;
	}
}
</style>
