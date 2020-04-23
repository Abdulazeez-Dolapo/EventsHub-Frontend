export const dateMixin = {
	methods: {
		formatDate(date) {
			const dateToFormat = new Date(date)
			const formattedDate = dateToFormat.toLocaleString(["en-us"], {
				month: "long",
				day: "2-digit",
				year: "numeric",
			})

			return formattedDate
		},
	},
}
