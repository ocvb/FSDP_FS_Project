const { DataTypes } = require('sequelize');
const db = require('@models/db');

const Volunteer = db.define('volunteers', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Volunteer;
