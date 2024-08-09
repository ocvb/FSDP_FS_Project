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
        if (error.code == 'ER_BAD_DB_ERROR') {
            console.error('Database does not exist');
        }
        if (error.code == 'ER_ACCESS_DENIED_ERROR') {
            console.error('Database username or password is incorrect');
        }
        if (error.code == 'ECONNREFUSED') {
            console.error('Database connection refused');
        }
        if (error.code == 'ENOTFOUND') {
            console.error(`Unable to connect ${error.syscall}`);
        }
        if (error.code == 'ETIMEDOUT') {
            console.error('Connection Timed Out');
        }
        console.error('Error:', error);
    });

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
