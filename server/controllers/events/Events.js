const Events = require("../../models/Events")

module.exports = {
	async addEvent(req, res) {
		try {
			const event = await Events.create(req.body)

			res.send({
				event: event,
				message: "You have successfully created an event",
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "There was an error creating your event",
			})
		}
	},

	async getEvents(req, res) {
		try {
			const response = await Events.findAll()
			res.send({
				events: response,
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "There was an error getting your events",
			})
		}
	},

	async getEvent(req, res) {
		try {
			const event = await Events.findOne({
				where: {
					event_id: req.params.id,
				},
			})
			res.send({
				event: event,
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Event could not be found",
			})
		}
	},

	async updateEvent(req, res) {
		try {
			await Events.update(
				{ number_attending: req.body.number },
				{
					where: {
						event_id: req.body.id,
					},
				}
			)
			const event = await Events.findOne({
				where: {
					event_id: req.body.id,
				},
			})
			res.send({
				data: event,
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Error updating event",
			})
		}
	},
}
