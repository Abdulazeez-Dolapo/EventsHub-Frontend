import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AllEvents from "../views/AllEvents.vue"
import EventPage from "../views/EventPage.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import CreateEvent from "../views/CreateEvent.vue"
import EditEvent from "../views/EditEvent.vue"
import Profile from "../views/Profile.vue"
import Nprogress from "nprogress"
import store from "@/store"
import jwt from "jsonwebtoken"

function checkToken(token) {
	store.state.logInStatus = true
	const decoded = jwt.verify(token, "secret")
	store.state.user = decoded
}

Vue.use(VueRouter)

const routes = [
	{
		path: "/events",
		name: "AllEvents",
		component: AllEvents,
		props: true,
		beforeEnter(to, from, next) {
			store.dispatch("getEvents").then(events => {
				to.params.events = events
				next()
			})
		}
	},
	{
		path: "/event/:id",
		name: "Event",
		component: EventPage,
		props: true,
		beforeEnter(to, from, next) {
			store.dispatch("getEvent", to.params.id).then(event => {
				to.params.event = event
				store.dispatch("getUserEvents").then(() => {
					store.dispatch("getUserCreatedEvents").then(() => {
						next()
					})
				})
			})
		}
	},
	{
		path: "/edit-event/:id",
		name: "Edit-Event",
		component: EditEvent,
		props: true,
		beforeEnter(to, from, next) {
			const token = sessionStorage.getItem("token")
			if (token) {
				checkToken(token)
				store.dispatch("getEvent", to.params.id).then(event => {
					to.params.eventData = event
					next()
				})
			} else {
				store.state.routeMessage =
					"You have to be logged in before you can Edit an event"
				next({ name: "Login" })
			}
		}
	},
	{
		path: "/register",
		name: "Register",
		component: Register
	},
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/create-event",
		name: "Create-Event",
		component: CreateEvent,
		beforeEnter(to, from, next) {
			const token = sessionStorage.getItem("token")
			if (token) {
				checkToken(token)
				next()
			} else {
				store.state.routeMessage =
					"You have to be logged in before you can create an event"
				next({ name: "Login" })
			}
		}
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		beforeEnter(to, from, next) {
			const token = sessionStorage.getItem("token")
			if (token) {
				checkToken(token)
				store.dispatch("getUserCreatedEvents").then(() => {
					store.dispatch("getUserEvents").then(() => {
						next()
					})
				})
			} else {
				store.state.routeMessage =
					"You have to be logged in to view this page"
				next({ name: "Login" })
			}
		}
	}
]
const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	Nprogress.start()
	next()
})

router.afterEach(() => {
	Nprogress.done()
})

export default router
