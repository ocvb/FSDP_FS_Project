const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    const { name, number, email } = req.body;
    const query =
        'INSERT INTO volunteers (name, number, email) VALUES (?, ?, ?)';
    db.query(query, [name, number, email], (err, results) => {
        if (err) {
            res.status(500).send('Error saving data');
        } else {
            res.status(200).send('Data saved successfully');
        }
    });
});

module.exports = router;
