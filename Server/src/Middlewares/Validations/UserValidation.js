const { UserSchema } = require('@schema/UserSchema');

exports.UserValidation = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const validatedData = await UserSchema.validate(
            { name, email, password },
            { abortEarly: false }
        );
        req.validation = validatedData;
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors });
    }
};
