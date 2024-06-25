const yup = require('yup');

const EventSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    location: yup.string().required(),
    date: yup.date().required(),
    price: yup.number().required()
});

module.exports = { EventSchema };