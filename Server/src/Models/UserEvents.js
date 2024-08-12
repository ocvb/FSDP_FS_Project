const { DataTypes } = require('sequelize');
const db = require('@models/db');

const UserEvents = db.define(
    'user_events',
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = UserEvents;
