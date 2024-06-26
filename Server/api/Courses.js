// const express = require("express");
// const router = express.Router();
// const { Courses } = require("../model");
// const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");

// // Courses APIs
// router.get('/user', TokenAuthentication, async (req, res) => {
//     const { userId } = req.query;

//     if (userId) {
//         const coursesByUserId = await Courses.findAll({
//             where: { userId: userId },
//             attributes: ['id', 'title', 'description']
//         });

//         console.log(coursesByUserId);
//         if (coursesByUserId.length > 0) {
//             res.status(200).json(coursesByUserId);
//         } else {
//             res.status(404).json({ message: 'No courses found for this user' });
//         }
//     } else {
//         const courses = await Courses.findAll();
//         res.status(200).json(courses);
//     }
// });

// router.get('/api/courses', async (req, res) => {
//     const courses = await Courses.findAll();
//     res.status(200).json(courses);
// });

// router.post("/api/courses", TokenAuthentication, async (req, res) => {
//     const { title, description } = req.body;

//     if (title.length === 0 || description.length === 0) {
//         res.status(400).json({ message: "Please enter the title and description." });
//         return;
//     }

//     const course = await Courses.create({
//         title, description
//     });

//     if (course) {
//         res.status(201).json({ message: "Course created successfully", course });
//     } else {
//         res.status(400).json({ message: "Course creation failed" });
//     }
// });

// router.put("/:id", TokenAuthentication, async (req, res) => {
//     const { id } = req.params;
//     const { title, description } = req.body;

//     console.log(req.body);

//     if (title === "" || description === "") {
//         res.status(400).json({ message: "Please provide all the required fields" });
//         return;
//     }

//     try {
//         const course = await Courses.update({
//             title, description
//         }, {
//             where: { id: id }
//         });

//         if (course[0]) {
//             res.status(200).json({ message: "Course updated successfully" });
//         } else {
//             res.status(400).json({ message: "Course update failed" });
//         }
//     } catch (err) {
//         console.error("Error updating course", err.message);
//         res.status(500).json({ message: "Course update failed", error: err.message });
//     }
// });

// router.delete("/:id", TokenAuthentication, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const course = await Courses.destroy({
//             where: { id: id }
//         });

//         if (course) {
//             res.status(200).json({ message: "Course deleted successfully" });
//         } else {
//             res.status(404).json({ message: "Course not found" });
//         }
//     } catch (err) {
//         console.error("Error deleting course", err.message);
//         res.status(500).json({ message: "Course deletion failed", error: err.message });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { Courses } = require("../model");
const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");

// Courses APIs

// Get courses by user ID
router.get('/user', TokenAuthentication, async (req, res) => {
    const { userId } = req.query;

    try {
        if (userId) {
            const coursesByUserId = await Courses.findAll({
                where: { userId: userId },
                attributes: ['id', 'title', 'description']
            });

            console.log(coursesByUserId);
            if (coursesByUserId.length > 0) {
                res.status(200).json(coursesByUserId);
            } else {
                res.status(404).json({ message: 'No courses found for this user' });
            }
        } else {
            const courses = await Courses.findAll();
            res.status(200).json(courses);
        }
    } catch (error) {
        console.error("Error fetching courses", error.message);
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
});

// Get all courses
router.get('/api/courses', async (req, res) => {
    try {
        const courses = await Courses.findAll();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses", error.message);
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
});

// Add a new course
router.post("/api/courses", TokenAuthentication, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: "Please enter the title and description." });
        return;
    }

    try {
        const course = await Courses.create({ title, description });

        if (course) {
            res.status(201).json({ message: "Course created successfully", course });
        } else {
            res.status(400).json({ message: "Course creation failed" });
        }
    } catch (error) {
        console.error("Error creating course", error.message);
        res.status(500).json({ message: "Course creation failed", error: error.message });
    }
});

// Update an existing course
router.put("/api/courses/:id", TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: "Please provide all the required fields" });
        return;
    }

    try {
        const [updated] = await Courses.update({ title, description }, { where: { id: id } });

        if (updated) {
            res.status(200).json({ message: "Course updated successfully" });
        } else {
            res.status(400).json({ message: "Course update failed" });
        }
    } catch (error) {
        console.error("Error updating course", error.message);
        res.status(500).json({ message: "Course update failed", error: error.message });
    }
});

// Delete a course
router.delete("/api/courses/:id", TokenAuthentication, async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Courses.destroy({ where: { id: id } });

        if (deleted) {
            res.status(200).json({ message: "Course deleted successfully" });
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.error("Error deleting course", error.message);
        res.status(500).json({ message: "Course deletion failed", error: error.message });
    }
});

module.exports = router;
