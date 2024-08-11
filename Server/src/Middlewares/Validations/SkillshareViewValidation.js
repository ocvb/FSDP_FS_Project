const { SkillshareViewSchema } = require('@schema/SkillshareViewSchema');

exports.SkillshareViewValidation = async (req, res, next) => {
    const { response } = req.body;

    try {
        const validation = await SkillshareViewSchema.validate(
            { response },
            { abortEarly: false }
        );
        req.validation = validation;
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0] });
    }
};
