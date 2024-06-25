const yup = require('yup');

exports.EventSchema = yup.object().shape({
    title: yup.string().min(1).required(),
    description: yup.string().min(1).required(),
    location: yup.string().min(1).required(),
    date: yup.date().required(),
    price: yup.number().min(1).required().positive(),
});
