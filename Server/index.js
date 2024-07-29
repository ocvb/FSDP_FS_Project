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

const startAPI = require('@endpoints/Api');
app.use('/api', startAPI);

// Add your API endpoints here
const userAPI = require('@endpoints/Account');
const eventAPI = require('@endpoints/Events');
const adminAPI = require('@endpoints/Admin');
const facilitiesAPI = require('@endpoints/Facilities');
const eventsSearchAPI = require('@endpoints/EventsSearch');
const skillshareAPI = require('@endpoints/SkillShare');

app.use('/api/user', userAPI);
app.use('/api/events', eventAPI);
app.use('/api/admin', adminAPI);
app.use('/api/facilities', facilitiesAPI);
app.use('/api/search', eventsSearchAPI);
app.use('/api/skillshare', skillshareAPI);

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
