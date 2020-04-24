import { mount, createLocalVue } from "@vue/test-utils"
import Header from "@/components/Header.vue"
import Vuex from "vuex"
import BootstrapVue from "bootstrap-vue"
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(Vuex)

localVue.use(BootstrapVue)
localVue.use(VueRouter)
const router = new VueRouter()

describe("Header", () => {
	let wrapper
	let store
	let state
	beforeEach(() => {
		state = {
			user: {
				logInStatus: "",
				user: "",
			},
			allEvents: "",
			searchedEvents: "",
		}
		store = new Vuex.Store({ state })
		wrapper = mount(Header, {
			localVue,
			store,
			router,
			data() {
				return {
					searchInput: "hi",
					searchBy: "",
				}
			},
		})
	})

	// make sure item is set when input is typed into
	it("should check if item is set when input is typed into", async () => {
		const input = wrapper.find('[data-testid="search-input"]')
		const searchInput = wrapper.vm.searchInput
		expect(searchInput).toBe("hi")
		input.setValue("hello")
		await wrapper.vm.$nextTick()
		expect(searchInput).toBe("hello")
	})

	// make sure searchBy is set when dropwdown clicked
	it("should check if item is set when input is typed into", () => {})

	// make sure method is called when logout is clicked
	it("should check if item is set when input is typed into", () => {})

	// make sure method is called when search is clicked
	it("should check if item is set when input is typed into", () => {})
})
