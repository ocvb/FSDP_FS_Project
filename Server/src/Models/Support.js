const db = require('@models/db');
const { DataTypes } = require('sequelize');

const Support = db.define('support', {
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    urgency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Support;
