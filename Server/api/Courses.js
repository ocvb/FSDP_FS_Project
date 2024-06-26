const express = require("express");
const router = express.Router();
const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");
const { Courses } = require("../model");

router.get('/user', TokenAuthentication, async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        const coursesByUserId = await Courses.findAll({
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
    const courses = await Courses.findAll();
    res.json(courses);
});

router.post('/api/courses', TokenAuthentication, async (req, res) => {
    const { title, description } = req.body;
    if (title.length == 0 || description.length == 0) {
        res.status(400).json({ message: "Please enter the title and description." });
        return;
    }

    const newCourse = await Courses.create({ title, description });
    res.status(201).json(newCourse);
});

router.put("/:id", TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    console.log(req.body)

    if (title == "" || description == "") {
        res.status(400).json({ message: "Please provide all the required fields" });
        return;
    }

    await Courses.update({ title, description }, { where: { id: id } });
    res.status(200).json({ message: "Course updated successfully" });
});

router.delete("/:id", TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Courses.destroy({
            where: { id: id }
        });

        if (Courses) {
            res.status(200).json({ message: "Course deleted successfully" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (err) {
        console.error("Error deleting course");
        res.status(500).json({ message: "Course deletion failed", error: err.message });
    }
});

module.exports = router;
