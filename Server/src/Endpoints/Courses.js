const express = require('express');
const router = express.Router();
const { Courses } = require('@models');
const { TokenAuthentication } = require('@middleware/TokenAuthentication');
const { CourseValidation } = require('@validations/CourseValidation');

// Courses APIs

// router.get('/', TokenAuthentication, async (req, res) => {
//     const { userId } = req.query;

//     try {
//         if (userId) {
//             const coursesByUserId = await Courses.findAll({
//                 where: { userId: userId },
//                 attributes: ['id', 'title', 'category', 'description'],
//             });

//             console.log(coursesByUserId);
//             if (coursesByUserId.length > 0) {
//                 res.status(200).json(coursesByUserId);
//             } else {
//                 res.status(404).json({
//                     message: 'No courses found for this user',
//                 });
//             }
//         } else {
//             const courses = await Courses.findAll();
//             res.status(200).json(courses);
//         }
//     } catch (error) {
//         console.error('Error fetching courses', error.message);
//         res.status(500).json({
//             message: 'Error fetching courses',
//             error: error.message,
//         });
//     }
// });

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Courses.findAll();
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses', error.message);
        res.status(500).json({
            message: 'Error fetching courses',
            error: error.message,
        });
    }
});

// Add a new course
router.post('/', TokenAuthentication, CourseValidation, async (req, res) => {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
        res.status(400).json({
            message: 'Please enter the title, category and description',
        });
        return;
    }

    try {
        const course = await Courses.create({ title, category, description });

        if (course) {
            res.status(201).json({
                message: 'Course created successfully',
                course,
            });
        } else {
            res.status(400).json({ message: 'Course creation failed' });
        }
    } catch (error) {
        console.error('Error creating course', error.message);
        res.status(500).json({
            message: 'Course creation failed',
            error: error.message,
        });
    }
});

// Update an existing course
router.put('/api/courses/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    try {
        const [updated] = await Courses.update(
            { title, category, description },
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

// Delete a course
router.delete('/api/courses/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Courses.destroy({ where: { id: id } });

        if (deleted) {
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

module.exports = router;
