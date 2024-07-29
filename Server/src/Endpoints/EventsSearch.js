const express = require('express');
const router = express.Router();
const { Events } = require('@models');
const { Op, where } = require('sequelize');
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

router.get('/', async (req, res) => {
    const events = await Events.findAll();
    res.status(200).json(events);
});

router.post('/', async (req, res) => {
    console.log('hello');

    const { title, date, location } = req.body;

    const whereConditions = {};

    console.log(req.body);

    console.log(whereConditions);

    // TODO: FIx Date Later

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

    res.status(200).json(events);
});

module.exports = router;
