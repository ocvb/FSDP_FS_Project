const yup = require('yup');

exports.CourseSchema = yup.object().shape({
    title: yup.string().min(1).required(),
    description: yup.string().min(1).required(),
});