export const timeMixin = {
	methods: {
		formatTime(time) {
			if (time.length > 5) {
				const hour = parseInt(time.substring(0, 2))
				const minute = time.substring(3, 5)
				if (hour > 12) {
					const newTime = `${hour - 12}:${minute} pm`
					return newTime
				} else if (hour == 12) {
					const newTime = `${hour}:${minute} pm`
					return newTime
				} else if (hour == 0) {
					const newTime = `12:${minute} am`
					return newTime
				} else {
					const newTime = `${hour}:${minute} am`
					return newTime
				}
			} else {
				return time
			}
		},
	},
}
