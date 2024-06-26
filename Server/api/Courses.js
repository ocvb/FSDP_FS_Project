const express = require("express");
const router = express.Router();
const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");

router.get('/user', TokenAuthentication, async (req, res) => {
    const { userId } = req.query;
});

router.get('/', async (req, res) => {
        const courses = await courses.find();
        res.json(courses);
});

router.post('api/courses', async (req, res) => {
    const course = new course({
        title: req.body.title,
        description: req.body.description,
    });
    
    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});