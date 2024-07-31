const yup = require('yup');

exports.SkillshareSchema = yup.object().shape({
    title: yup
        .string()
        .required()
        .min(3, 'Title must be at least 3 characters long'),
    description: yup
        .string()
        .required()
        .min(3, 'Description must be at least 3 characters long'),
    postedBy: yup
        .string()
        .required()
        .min(3, 'Posted by must be at least 3 characters long'),
    category: yup
        .string()
        .required()
        .min(1, 'Category must be at least 1 characters long'),
    numberOfResponded: yup.number().optional(),
});
