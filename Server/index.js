require('dotenv').config();
require('module-alias/register');

const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
const { db } = require('@models');

app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: 'GET, POST, PUT, DELETE',
    })
);
// Don't touch Above this line
// Don't touch Beyond this line

// Add endpoints in routing.js
const routings = require('./routings');
app.use(routings);

// Don't touch beyond this line
app.get('/', (req, res) => {
    res.send(
        'You have reached the server. Please use the client to view the website.'
    );
});

db.sync()
    .then(() => {
        console.log('Database is ready');
    })
    .catch((error) => {
        console.error('Error:', error);
    });

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
