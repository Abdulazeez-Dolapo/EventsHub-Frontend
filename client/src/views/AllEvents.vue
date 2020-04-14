<template>
	<div class="all-events">
		<div v-if="showError" class="search">
			<p>
				Oops! No result found
			</p>
		</div>
		<div class="all-cards">
			<div
				v-for="event in pagedEvents"
				:key="event.event_id"
				@click="viewEvent(event.event_id)"
				class="card mt-5 mx-3 row-eq-height"
				style="width: 60%; display: inline-block"
			>
				<div class="card-body">
					<h5 class="card-title py-0 px-0">{{ event.title }}</h5>
					<p class="card-text">
						{{ event.description }}
					</p>
				</div>
				<div class="card-footer mt-0 pt-0">
					<small class="text-muted"
						>{{ formattedDate }} @{{ event.time }} in
						{{ event.location }}</small
					>
				</div>
			</div>
		</div>

		<div class="nav">
			<button :disabled="!showPrev" @click="prev">
				<i class="fas fa-fast-backward"></i>
			</button>
			<button :disabled="!showNext" @click="next">
				<i class="fas fa-fast-forward"></i>
			</button>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"

export default {
	name: "AllEvents",
	props: {
		events: {
			type: Array,
			required: true
		}
	},
	created() {
		this.showPrev = false
		this.paginate()
	},
	data() {
		return {
			pagedEvents: null,
			page: 1,
			start: 0,
			end: 5,
			showPrev: true,
			showNext: true,
			showError: false
		}
	},
	watch: {
		page() {
			this.paging()
		},
		searchedEvents() {
			this.start = 0
			this.end = 5
			this.paginate()
			this.paging()
			this.page = 1
			console.log(this.searchedEvents.length)
			if (!this.searchedEvents.length) {
				this.showError = true
			} else {
				this.showError = false
			}
		}
	},
	computed: {
		...mapState(["logInStatus", "searchedEvents"]),
		formattedDate() {
			for (const event of this.events) {
				const date = new Date(event.date)
				const formattedDate = date.toLocaleString(["en-us"], {
					month: "long",
					day: "2-digit",
					year: "numeric"
				})
				return formattedDate
			}
		}
	},
	methods: {
		viewEvent(id) {
			this.$router.push({ path: `event/${id}` })
		},
		paginate(start = 0, end = 5) {
			let eventList
			if (this.searchedEvents) {
				eventList = this.searchedEvents
			} else {
				eventList = this.events
			}
			const pagedEvents = eventList.slice(start, end)
			console.log(eventList)
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
				behavior: "smooth"
			})
		},
		paging() {
			let maxPageNumber
			if (this.searchedEvents) {
				maxPageNumber = Math.ceil(this.searchedEvents.length / 5)
			} else {
				maxPageNumber = Math.ceil(this.events.length / 5)
			}
			console.log(maxPageNumber)
			console.log(this.page)
			if (!this.searchedEvents.length || maxPageNumber == 1) {
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
		}
	}
}
</script>
<style scoped>
.all-events {
	margin: 0;
	min-height: 90vh;
	background-color: blue;
}

.all-cards {
	height: 90%;
	width: 80%;
	justify-self: center;
	top: 50%;
	left: 50%;
}
.nav {
	width: 60%;
	padding: 0.2em 0.2em;
	justify-content: center;
	margin: 0 auto;
}

.nav button:hover {
	cursor: pointer;
}

.event:hover {
	cursor: pointer;
}
</style>
