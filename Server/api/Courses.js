const express = require("express");
const router = express.Router();
const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");
const { Courses } = require("../model");

router.get('/user', TokenAuthentication, async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        const coursesByUserId = await Events.findAll({
            where: { userId: userId },
            attributes: ['id', 'title', 'description']
        });

        console.log(coursesByUserId)
        if (coursesByUserId.length > 0) {
            res.status(200).json(coursesByUserId);
        } else {
            res.status(404).json({ message: 'No courses found for this user' });
        }
    } else {
        const courses = await Courses.findAll();
        res.status(200).json(courses);
    }
});

router.get('/', async (req, res) => {
        const courses = await courses.find();
        res.json(courses);
});

router.post('api/courses', TokenAuthentication, async (req, res) => {
    const { title, description } = req.body;
    if (title.length == 0 || description.length == 0){
        res.status(400).json({ message: "Please enter the title and description." });
        return;
    }

    
    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;