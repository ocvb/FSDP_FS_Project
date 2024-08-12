const express = require('express');
const router = express.Router();
const { Donation } = require('@models/index');

router.post('/payment', (req, res) => {
    const { email, creditCard, expiryDate, cvv } = req.body;

    const query =
        'INSERT INTO payments (email, creditCard, expiryDate, cvv) VALUES (?, ?, ?, ?)';
    db.query(query, [email, creditCard, expiryDate, cvv], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Payment details saved successfully' });
    });
});

module.exports = router;
