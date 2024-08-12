const { SkillshareSchema } = require('@schema/SkillshareSchema');

exports.SkillshareValidation = async (req, res, next) => {
    const { title, description, postedBy, category } = req.body;

    try {
        const validation = await SkillshareSchema.validate(
            { title, description, postedBy, category },
            { abortEarly: false }
        );
        req.validation = validation;
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0] });
    }
};
