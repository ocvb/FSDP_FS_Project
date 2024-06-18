const express = require("express");
const router = express.Router();
const { Events } = require("../model");
const { authenticationToken } = require("./Auth/Middleware");

// Events APIs

router.get('/api/user/events', authenticationToken, async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        const eventsByUserId = await Events.findAll({
            where: { userId: userId },
            attributes: ['id', 'title', 'location', 'date', 'price']
        });

        console.log(eventsByUserId)
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

router.get('/api/events', async (req, res) => {
    const events = await Events.findAll();
    res.status(200).json(events);
});

router.post("/api/events", authenticationToken, async (req, res) => {
    const { title, description, location, date, price } = req.body;
    const formattedDate = new Date(date); // console.log(formattedDate.toLocaleString());
    const event = await Events.create({
        title, description, location, date: formattedDate, price
    });
    res.json(event);
});

module.exports = router;