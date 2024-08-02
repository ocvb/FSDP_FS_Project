const express = require('express');
const router = express.Router();
const { Users, Events, Courses } = require('@models/index');
const { TokenAuthentication } = require('@middleware/TokenAuthentication');
const bcrypt = require('bcrypt');
const process = require('process');
// TODO: Admin Token Validation Middleware

function genHash(password) {
    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}

// User Endpoints
router.get('/users', TokenAuthentication, async (req, res) => {
    const users = await Users.findAll();
    res.status(200).json(users);
});

router.put('/user/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    if (username == null || password == null || role == null) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    const encryptedPassword = genHash(password);

    const user = await Users.upsert(
        {
            id,
            username,
            password: encryptedPassword,
            role,
        },
        {
            where: { id: id },
        }
    );

    if (user) {
        res.status(200).json({ message: 'User updated successfully' });
    } else {
        res.status(400).json({ message: 'User update failed' });
    }
});

router.delete('/user/:id', TokenAuthentication, async (req, res) => {
    console.log('Delete User', req.params.id);
    const { id } = req.params;
    if (!id > 0) {
        res.json({ status: 401, message: 'Invalid uuid' });
        return;
    }

    const deleteUser = await Users.destroy({ where: { id } });
    if (deleteUser == 1) {
        res.json({ status: 'success', message: 'User deleted' });
    } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
    }
});

// Event Endpoints
router.get('/events', TokenAuthentication, async (req, res) => {
    const events = await Events.findAll();
    res.status(200).json(events);
});

router.put('/event/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, description, location, date, price, userId } = req.body;

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
                userId,
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

router.delete('/event/:id', TokenAuthentication, async (req, res) => {
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

// Course Endpoints
router.get('/courses', TokenAuthentication, async (req, res) => {
    const courses = await Courses.findAll();
    res.status(200).json(courses);
});

router.put('/course/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    try {
        const [updated] = await Courses.upsert(
            { id, title, category, description },
            { where: { id: id } }
        );

        if (updated) {
            res.status(200).json({ message: 'Course updated successfully' });
        } else {
            res.status(400).json({ message: 'Course update failed' });
        }
    } catch (error) {
        console.error('Error updating course', error.message);
        res.status(500).json({
            message: 'Course update failed',
            error: error.message,
        });
    }
});

router.delete('/course/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Courses.destroy({
            where: { id: id },
        });

        if (course) {
            res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error deleting course', error.message);
        res.status(500).json({
            message: 'Course deletion failed',
            error: error.message,
        });
    }
});

// Reward



module.exports = router;
