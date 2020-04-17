const Guests = require("../../models/Guests")
const Events = require("../../models/Events")

module.exports = {
	async markAttendance(req, res) {
		try {
			const event = await Events.findOne({
				where: {
					event_id: req.body.event_id,
				},
			})

			if (Number(event.number_attending) >= Number(event.max_guests)) {
				res.send({
					message: "Sorry! This event has reached it's maximum limit",
				})
				return
			} else {
				await Guests.create(req.body)
				const allGuests = await Guests.findAll({
					where: {
						event_id: req.body.event_id,
					},
				})
				res.send({
					number: allGuests.length,
					message:
						"Hurray! You have marked yourself as attending this event",
				})
			}
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "You are unable to attend this event",
			})
		}
	},

	async cancelAttendance(req, res) {
		try {
			await Guests.destroy({
				where: {
					event_id: req.body.event_id,
					guest_user_id: req.body.guest_user_id,
				},
			})
			const allGuests = await Guests.findAll({
				where: {
					event_id: req.body.event_id,
				},
			})
			res.send({
				number: allGuests.length,
				message:
					"You have successfully canceled your attendance at this event",
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "You are unable to cancel this event",
			})
		}
	},

	async getUserEvents(req, res) {
		try {
			const response = await Guests.findAll({
				where: {
					guest_user_id: req.params.id,
				},
			})
			res.send({
				data: response,
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Error getting user's events",
			})
		}
	},
}
