const yup = require('yup');

exports.RewardSchema = yup.object().shape({
    title: yup.string().min(1).required(),
    description: yup.string().min(1).required(),
    points: yup.number().min(1).required().positive(),
    claimed: yup.boolean().default(false).required(),
    popular: yup.boolean().default(false).required(),
    endDate: yup.date().nullable(),
    imageUrl: yup.string().url().nullable(),
    category: yup.string().min(1).nullable(),
});
