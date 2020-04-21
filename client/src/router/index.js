import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AllEvents from "../views/AllEvents.vue"
import EventPage from "../views/EventPage.vue"
import Register from "../views/Register.vue"
import EmailConfirmation from "../views/EmailConfirmation.vue"
import Login from "../views/Login.vue"
import CreateEvent from "../views/CreateEvent.vue"
import EditEvent from "../views/EditEvent.vue"
import Profile from "../views/Profile.vue"
import ErrorPage from "../views/Error.vue"
import NetworkError from "../views/NetworkError.vue"
import Welcome from "../views/Welcome.vue"
import Nprogress from "nprogress"
import store from "@/store"

function checkToken(token, user) {
	if (token) {
		store.dispatch("user/getUser", user)
	}
}

Vue.use(VueRouter)

const routes = [
	{
		path: "/welcome",
		name: "Welcome",
		component: Welcome,
	},
	{
		path: "/events",
		name: "AllEvents",
		component: AllEvents,
		props: true,
		beforeEnter(to, from, next) {
			store
				.dispatch("event/getEvents")
				.then(events => {
					to.params.sentEvents = events
					next()
				})
				.catch(error => {
					console.log(error)
					if (!error.response) {
						next({ name: "NetworkError" })
					}
				})
		},
	},
	{
		path: "/event/:id",
		name: "Event",
		component: EventPage,
		props: true,
		beforeEnter(to, from, next) {
			store
				.dispatch("event/getEvent", to.params.id)
				.then(event => {
					to.params.sentEvent = event
					store.dispatch("event/getUserEvents").then(() => {
						store.dispatch("event/getUserCreatedEvents").then(() => {
							next()
						})
					})
				})
				.catch(error => {
					console.log(error)
					if (error.response && error.response.status == "404") {
						next({
							name: "NotFound",
							params: { missing: "event" },
						})
					} else {
						next({ name: "NetworkError" })
					}
				})
		},
	},
	{
		path: "/edit-event/:id",
		name: "Edit-Event",
		component: EditEvent,
		props: true,
		beforeEnter(to, from, next) {
			const token = sessionStorage.getItem("token")
			if (token) {
				const user = JSON.parse(sessionStorage.getItem("user"))
				checkToken(token, user)
				store.dispatch("event/getEvent", to.params.id).then(event => {
					to.params.eventData = event
					next()
				})
			} else {
				store.state.routeMessage =
					"You have to be logged in before you can Edit an event"
				next({ name: "Login" })
			}
		},
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
		beforeEnter(to, from, next) {
			store.dispatch("user/logout")
			next()
		},
	},
	{
		path: "/confirmation/:token",
		name: "EmailConfirmation",
		component: EmailConfirmation,
		props: true,
		beforeEnter(to, from, next) {
			store
				.dispatch("user/confirm", to.params.token)
				.then(() => {
					next()
				})
				.catch(err => {
					console.log(err)
					to.params.error = true
					next()
				})
		},
	},
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		beforeEnter(to, from, next) {
			store.dispatch("user/logout")
			next()
		},
	},
	{
		path: "/create-event",
		name: "Create-Event",
		component: CreateEvent,
		beforeEnter(to, from, next) {
			const token = sessionStorage.getItem("token")
			if (token) {
				const user = JSON.parse(sessionStorage.getItem("user"))
				checkToken(token, user)
				next()
			} else {
				store.state.routeMessage =
					"You have to be logged in before you can create an event"
				next({ name: "Login" })
			}
		},
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		beforeEnter(to, from, next) {
			const token = sessionStorage.getItem("token")
			if (token) {
				const user = JSON.parse(sessionStorage.getItem("user"))
				checkToken(token, user)
				store.dispatch("event/getUserCreatedEvents").then(() => {
					store.dispatch("event/getUserEvents").then(() => {
						next()
					})
				})
			} else {
				store.state.routeMessage =
					"You have to be logged in to view this page"
				next({ name: "Login" })
			}
		},
	},
	{
		path: "/not-found",
		name: "NotFound",
		component: ErrorPage,
		props: true,
	},
	{
		path: "/network-error",
		name: "NetworkError",
		component: NetworkError,
	},
	{
		path: "*",
		redirect: { name: "NotFound", params: { missing: "page" } },
	},
]
const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
	},
})

router.beforeEach((to, from, next) => {
	Nprogress.start()
	next()
})

router.afterEach(() => {
	Nprogress.done()
})

export default router
