const express = require('express');
const router = express.Router();
const { Events } = require('@models');
const { TokenAuthentication } = require('@middleware/TokenAuthentication');
const { EventValidation } = require('@validations/EventValidation');

router.get('/user', TokenAuthentication, async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        const eventsByUserId = await Events.findAll({
            where: { userId: userId },
            attributes: ['id', 'title', 'location', 'date', 'price'],
        });

        console.log(eventsByUserId);
        if (eventsByUserId.length > 0) {
            res.status(200).json(eventsByUserId);
        } else {
            res.status(404).json({ message: 'No events found for this user' });
        }
    } else {
        const events = await Events.findAll();
        res.status(200).json(events);
    }
});

router.get('/eventsSearch', async (req, res) => {
    const events = await Events.findAll();
    res.status(200).json(events);
});

router.post('/search', EventValidation, async (req, res) => {
    try {
        const { title, date, location } = req.body;

        const whereConditions = {};

        if (title) whereConditions.title = { [Op.like]: `%${title}%` };
        if (location) whereConditions.location = { [Op.like]: `%${location}%` };
        if (date) whereConditions.date = new Date(date);

        const events = await Event.findAll({
            where: whereConditions,
            order: [['date', 'DESC']],
        });

        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
