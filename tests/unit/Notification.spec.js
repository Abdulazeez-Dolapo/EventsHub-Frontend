import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import Notification from "@/components/Notification.vue"
import flushPromises from "flush-promises"
// import sinon from 'sinon'
// import { state, actions } from "@/store"

const localVue = createLocalVue()
localVue.use(Vuex)

// jest.useFakeTimers()

describe("Notification", () => {
	let state
	let actions
	let store
	let wrapper

	beforeEach(() => {
		state = {
			message: "hello",
			color: "purple",
		}
		actions = {
			setDisplay: jest.fn(),
		}
		store = new Vuex.Store({
			state,
			actions,
		})

		wrapper = shallowMount(Notification, { store, localVue })
	})

	it("renders 'state.message' if it has a truthy value", () => {
		const p = wrapper.find("p")
		const text = p.text()
		expect(text).toBe(state.message)
	})

	it("renders nothing if 'state.message' has a falsy value", async () => {
		const p = wrapper.find("p")
		state.message = ""
		await wrapper.vm.$nextTick()
		const text = p.text()
		expect(text).toBe(state.message)
	})

	it("binds 'state.color' to the class of 'p'", async () => {
		const p = wrapper.find("p")
		expect(p.classes()).toContain(state.color)
		expect(p.classes(state.color)).toBe(true)
	})

	jest.useFakeTimers()
	it("should call a method that dispatches an action after 5 seconds", () => {
		expect(actions.setDisplay).not.toHaveBeenCalled()
		jest.runAllTimers()
		expect(actions.setDisplay).toHaveBeenCalled()
	})
})
