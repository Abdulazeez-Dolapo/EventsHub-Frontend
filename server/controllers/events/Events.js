const Events = require("../../models/Events")

module.exports = {
	async addEvent(req, res) {
		try {
			const event = await Events.create(req.body)

			res.send({
				event: event,
				message: "Event successfully created",
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Error creating your event",
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
				error: "Error getting your events",
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
			if (!event) {
				return res.status(404).send({
					error: "Event desn't exist",
				})
			} else {
				res.send({
					event: event,
				})
			}
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Event could not be found",
			})
		}
	},

	async deleteEvent(req, res) {
		try {
			const response = await Events.destroy({
				where: {
					event_id: req.params.id,
				},
			})
			res.status(200).json({
				message: "Event successfully deleted",
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Event could not be deleted",
			})
		}
	},

	async getUserCreatedEvents(req, res) {
		try {
			const response = await Events.findAll({
				where: {
					organiser_id: req.params.user_id,
				},
			})
			res.send({
				userEvents: response,
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Event could not be found",
			})
		}
	},

	async updateEventAttendance(req, res) {
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

	async updateEvent(req, res) {
		try {
			const event = await Events.update(
				{
					title: req.body.title,
					category: req.body.category,
					description: req.body.description,
					location: req.body.location,
					time: req.body.time,
					date: req.body.date,
					max_guests: req.body.max_guests,
				},
				{
					where: {
						event_id: req.body.event_id,
					},
				}
			)
			res.send({
				message: "Event successfully edited",
			})
		} catch (error) {
			console.log(error)
			res.status(400).send({
				error: "Error updating event",
			})
		}
	},
}
