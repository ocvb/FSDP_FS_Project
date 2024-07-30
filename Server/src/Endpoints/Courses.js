const express = require('express');
const router = express.Router();
const { Courses } = require('@models/index');
const { CourseValidation } = require('@validations/CourseValidation');

// Courses APIs

// Get all courses
router.post('/category', async (req, res) => {
    const { category } = req.body;
    console.log('awdawd');

    try {
        let courses;
        if (category) {
            courses = await Courses.findAll({
                where: { category: category },
                // attributes: ['id', 'title', 'category', 'description'],
            });
        } else {
            courses = await Courses.findAll();
        }

        console.log(courses);
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
router.post('/', CourseValidation, async (req, res) => {
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
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, category, description } = req.body;

//     if (!title || !category || !description) {
//         res.status(400).json({
//             message: 'Please provide all the required fields',
//         });
//         return;
//     }

//     try {
//         const [updated] = await Courses.update(
//             { title, category, description },
//             { where: { id: id } }
//         );

//         if (updated) {
//             res.status(200).json({ message: 'Course updated successfully' });
//         } else {
//             res.status(400).json({ message: 'Course update failed' });
//         }
//     } catch (error) {
//         console.error('Error updating course', error.message);
//         res.status(500).json({
//             message: 'Course update failed',
//             error: error.message,
//         });
//     }
// });

// // Delete a course
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deleted = await Courses.destroy({ where: { id: id } });

//         if (deleted) {
//             res.status(200).json({ message: 'Course deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Course not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting course', error.message);
//         res.status(500).json({
//             message: 'Course deletion failed',
//             error: error.message,
//         });
//     }
// });

module.exports = router;
