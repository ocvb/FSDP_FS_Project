const { DataTypes } = require('sequelize');
const { db } = require('@models');

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
