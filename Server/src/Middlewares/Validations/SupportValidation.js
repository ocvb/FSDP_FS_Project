const { SupportSchema } = require('@schema/SupportSchema');

exports.SupportValidation = async (req, res, next) => {
    const { location, urgency, description } = req.body;

    try {
        const validation = await SupportSchema.validate(
            { location, urgency, description },
            { abortEarly: false }
        );
        req.validation = validation;
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0] });
    }
};
