const yup = require('yup');

exports.SkillshareViewSchema = yup.object().shape({
    response: yup
        .string()
        .required()
        .min(5, 'Response must be at least 5 characters long'),
});
