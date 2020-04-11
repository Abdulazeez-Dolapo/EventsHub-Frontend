<template>
	<div class="home">
		<p>
			{{ logInStatus }}
		</p>
		<div
			class="event"
			v-for="event in pagedEvents"
			:key="event.event_id"
			@click="viewEvent(event.event_id)"
		>
			<p>{{ formattedDate }} @{{ event.time }} in {{ event.location }}</p>
			<h4>
				{{ event.title }}
			</h4>
			<p>
				{{ event.description }}
			</p>
		</div>
		<div class="nav">
			<button :disabled="!showPrev" @click="prev">Prev</button>
			<button :disabled="!showNext" @click="next">Next</button>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"

export default {
	name: "Home",
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
			showNext: true
		}
	},
	watch: {
		page() {
			const maxPageNumber = Math.ceil(this.events.length / 5)
			if (this.page == 1) {
				this.showPrev = false
			} else if (this.page == maxPageNumber) {
				this.showNext = false
			} else {
				this.showNext = true
				this.showPrev = true
			}
		}
	},
	computed: {
		...mapState(["logInStatus"]),
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
			const eventList = this.events
			const pagedEvents = eventList.slice(start, end)
			this.pagedEvents = pagedEvents
		},
		next() {
			this.start = this.start + 5
			this.end = this.end + 5
			this.page++
			this.paginate(this.start, this.end)
		},
		prev() {
			this.start = this.start - 5
			this.end = this.end - 5
			this.page--
			this.paginate(this.start, this.end)
		}
	}
}
</script>
<style scoped>
.event {
	width: 60%;
	margin-left: 10rem;
	margin-bottom: 0.4rem;
	padding: 0.1rem 1rem;
	box-shadow: 1px 2px 5px #ccc;
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
