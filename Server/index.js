require('dotenv').config();
require('module-alias/register');

const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
const { db, removeUniqueConstraint } = require('@models/index');

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

// db.sync({ alter: true })
// db.sync()
//     .then(() => {
//         console.log('Database is ready');
//         // removeUniqueConstraint();
//     })
//     .catch((error) => {
//         if (error.code === 'ER_BAD_DB_ERROR') {
//             console.error('Database does not exist');
//         } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
//             console.error('Database username or password is incorrect');
//         } else if (error.code === 'ECONNREFUSED') {
//             console.error('Database connection refused');
//         } else if (error.code === 'ENOTFOUND') {
//             console.error(`Unable to connect: ${error.syscall}`);
//         } else if (error.code === 'ETIMEDOUT') {
//             console.error('Connection Timed Out');
//         } else {
//             console.error('Error:', error);
//         }
//     });

console.log(
    `Usage for the server: \
    \nnpm start - server will continue to run in background \
    \npm2 log - will show the logs of the server \
    \npm2 stop 0 - will stop the server`
);

(async () => {
    try {
        await db.sync({ alter: true });
        // Ensure removeUniqueConstraint is defined before calling it
        if (typeof removeUniqueConstraint === 'function') {
            removeUniqueConstraint();
        } else {
            console.warn(
                'removeUniqueConstraint is not defined or not a function'
            );
        }
        console.log('Database is ready');

        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    } catch (error) {
        if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('Database does not exist');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Database username or password is incorrect');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('Database connection refused');
        } else if (error.code === 'ENOTFOUND') {
            console.error(`Unable to connect: ${error.syscall}`);
        } else if (error.code === 'ETIMEDOUT') {
            console.error('Connection Timed Out');
        } else {
            console.error('Error:', error);
        }
    }
})();
