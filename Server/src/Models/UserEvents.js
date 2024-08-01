const { DataTypes } = require('sequelize');
const db = require('@models/db');
const Users = require('@models/Users');
const Events = require('@models/Events');

const UserEvents = db.define('user_events', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id',
        },
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: Events,
            key: 'id',
        },
        allowNull: false,
    },
});

module.exports = UserEvents;
