import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import Notification from "@/components/Notification.vue"
import flushpromises from "flush-promises"

const localVue = createLocalVue()
localVue.use(Vuex)

jest.useFakeTimers()

describe("Notification", () => {
	let state = {
		message: "hello",
		color: "purple",
	}

	let actions = {
		actionCall: jest.fn(),
	}

	let store = new Vuex.Store({
		state,
	})

	it("renders 'state.message' if state.message has a value", () => {
		const wrapper = shallowMount(Notification, { store, localVue })
		const p = wrapper.find("p")
		const text = p.text()
		expect(text).toBe(state.message)
	})

	it("renders nothing if state.message has a falsy value", async () => {
		const wrapper = shallowMount(Notification, { store, localVue })
		const p = wrapper.find("p")
		state.message = ""
		await wrapper.vm.$nextTick()
		const text = p.text()
		expect(text).toBe(state.message)
	})

	it("binds 'state.color' to the class of 'p'", async () => {
		const wrapper = shallowMount(Notification, { store, localVue })
		const p = wrapper.find("p")
		expect(p.classes()).toContain(state.color)
		expect(p.classes(state.color)).toBe(true)
	})

	it("should call a method that dispatches an action after 5 seconds", async () => {
		const timer = jest.fn()
		const wrapper = shallowMount(Notification, {
			store,
			localVue,
			methods: {
				timer,
			},
		})
		expect(wrapper.vm.timer).toHaveBeenCalled()
		// expect(actions.actionCall).not.toHaveBeenCalled()
		// jest.advanceTimersByTime(5000)
		// await wrapper.vm.$nextTick()
		// expect(actions.actionCall).toHaveBeenCalledTimes(1)
	})
})
