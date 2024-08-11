const { RewardsSchema } = require('@schema/RewardsSchema');

exports.RewardsValidation = async (req, res, next) => {
    const {
        title,
        description,
        points,
        claimed,
        popular,
        endDate,
        imageUrl,
        category,
    } = req.body;

    try {
        const validation = await RewardsSchema.validate(
            {
                title,
                description,
                points,
                claimed,
                popular,
                endDate,
                imageUrl,
                category,
            },
            { abortEarly: false }
        );
        req.validation = validation;
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0] });
    }
};
