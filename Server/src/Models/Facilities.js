const { DataTypes } = require('sequelize');
const db = require('@models/db');

const Facilities = db.define('facilities', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

module.exports = Facilities;
