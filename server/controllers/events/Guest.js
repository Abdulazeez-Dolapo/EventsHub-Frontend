const Guests = require("../../models/Guests")

module.exports = {
	async markAttendance(req, res) {
		try {
			await Guests.create(req.body)
			const allGuests = await Guests.findAll({
				where: {
					event_id: req.body.event_id,
				},
			})
			res.send({
				number: allGuests.length,
				message: "Hurray! You have marked yourself as attending this event",
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "You are unable to attend this event",
			})
		}
	},

	// async getGuests(req, res) {
	// 	try {
	// 		const response = await Guests.findAll({
	// 			where: {
	// 				event_id: req.params.id,
	// 			},
	// 		})
	// 		res.send({
	// 			data: response.length,
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 		res.status(400).send({
	// 			error: "Error getting guests",
	// 		})
	// 	}
	// },
}
