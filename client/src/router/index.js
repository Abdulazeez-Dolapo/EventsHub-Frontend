import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import EventPage from "../views/EventPage.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import CreateEvent from "../views/CreateEvent.vue"
import Nprogress from "nprogress"
import store from "@/store"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		props: true,
		beforeEnter(to, from, next) {
			store.dispatch("getEvents").then(events => {
				to.params.events = events
				next()
			})
		},
	},
	{
		path: "/event/:id",
		name: "Event",
		component: EventPage,
		props: true,
		beforeEnter(to, from, next) {
			store.dispatch("getEvent", to.params.id).then(event => {
				to.params.event = event
				next()
			})
		},
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/create-event",
		name: "Create-Event",
		component: CreateEvent,
		beforeEnter(to, from, next) {
			if (store.state.logInStatus) {
				next()
			} else {
				store.state.routeMessage =
					"You have to be logged in before you can create an event"
				next({ name: "Login" })
			}
		},
	},
]
const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	Nprogress.start()
	next()
})

router.afterEach(() => {
	Nprogress.done()
})

export default router
