const { yup } = require('yup');

exports.UserSchema = yup.object().shape({
    username: yup.string().min(1).required(),
    password: yup.string().min(1).required(),
    role: yup.string().min(1).required(),
});