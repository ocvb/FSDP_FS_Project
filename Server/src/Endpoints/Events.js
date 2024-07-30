const express = require('express');
const router = express.Router();
const { Events } = require('@models');
const { TokenAuthentication } = require('@middleware/TokenAuthentication');
const { EventValidation } = require('@validations/EventValidation');
const { Op } = require('sequelize');

// Events APIs
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

router.get('/', async (req, res) => {
    const events = await Events.findAll();
    res.status(200).json(events);
});

router.post('/', TokenAuthentication, EventValidation, async (req, res) => {
    const { title, description, location, date, price } = req.body;

    if (
        title == null ||
        description == null ||
        location == null ||
        date == null ||
        price == null
    ) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    const formattedDate = new Date(date);
    const event = await Events.create({
        title,
        description,
        location,
        date: formattedDate,
        price,
    });

    if (event) {
        res.status(201).json({ message: 'Event created successfully' });
    } else {
        res.status(400).json({ message: 'Event creation failed' });
    }
});

// For the PUT request
router.put('/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, description, location, date, price } = req.body;

    console.log(req.body);

    if (title == '' || description == '' || location == '' || !(price >= 0)) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    try {
        const formattedDate = new Date(date);
        const event = await Events.upsert(
            {
                id,
                title,
                description,
                location,
                date: formattedDate,
                price,
            },
            {
                where: { id: id },
            }
        );

        if (event) {
            res.status(200).json({ message: 'Event updated successfully' });
        } else {
            res.status(400).json({ message: 'Event update failed' });
        }
    } catch (err) {
        console.error('Error updating events', err.message);
        res.status(500).json({
            message: 'Event update failed',
            error: err.message,
        });
    }
});

// For the DELETE request
router.delete('/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Events.destroy({
            where: { id: id }, // Make sure to use the id from req.params
        });

        if (event) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        console.error('Error deleting events');
        res.status(500).json({
            message: 'Event deletion failed',
            error: err.message,
        });
    }
});

// SearchAPI
router.post('/search', async (req, res) => {
    console.log('hello');

    const { title, date, location } = req.body;

    const whereConditions = {};

    console.log(req.body);

    console.log(whereConditions);

    // TODO: Fix Date Later

    // if (title) whereConditions.title = { [Op.like]: `%${title}%` };
    // if (location) whereConditions.location = { [Op.like]: `%${location}%` };
    // if (date) whereConditions.date = new Date(date);

    let checkDate = '';

    console.log(date);

    if (date != '') {
        checkDate = new Date(date).toLocaleDateString();
    } else {
        checkDate = '';
    }

    if (date) whereConditions.date = { checkDate };
    console.log(checkDate);

    const events = await Events.findAll({
        where: {
            title: { [Op.like]: `%${title}%` },
            location: { [Op.like]: `%${location}%` },
            ...whereConditions,
        },
    });

    // console.log(date);
    // console.log(new Date(date).toLocaleDateString());
    // console.log(events);

    res.status(200).json(events);
});

// details API
router.get('/details', async (req, res)=>{
    res.status(200)
})

router.post('/details', async (req, res) => {
    const { id } = req.body;

    if (
        id == null
    ) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    const event = await Events.findOne({
        where: { id }
    });

    console.log(event)

    if (event) {
        res.status(201).json(event);
    } else {
        res.status(400).json({ message: 'Event creation failed' });
    }
});


module.exports = router;
