const { EventSchema } = require('@schema/EventSchema');


exports.EventValidation = async (req, res, next) => {
    const { title, description, location, date, price } = req.body;

    try {
        await EventSchema.validate({ title, description, location, date, price });
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0] });
    }
};