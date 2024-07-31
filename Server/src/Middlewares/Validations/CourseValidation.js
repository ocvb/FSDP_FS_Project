const { CourseSchema } = require('@schema/CourseSchema');

exports.CourseValidation = async (req, res, next) => {
    const { title, category, description } = req.body;

    try {
        await CourseSchema.validate({ title, category, description });
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0] });
    }
};