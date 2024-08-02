const yup = require('yup');

exports.SupportSchema = yup.object().shape({
    location: yup
        .string()
        .min(1, 'Location is required')
        .required('Location is required'),
    urgency: yup
        .string()
        .oneOf(['None', 'Low', 'Medium', 'High'], 'Invalid urgency level')
        .required('Urgency is required'),
    description: yup
        .string()
        .min(1, 'Description is required')
        .required('Description is required'),
});
