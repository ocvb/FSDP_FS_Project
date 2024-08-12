const { DataTypes } = require('sequelize');
const db = require('@models/db');

const Donation = db.define('donations', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creditCard: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cvv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Donation;
