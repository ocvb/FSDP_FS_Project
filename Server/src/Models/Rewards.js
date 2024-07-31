const { DataTypes } = require('sequelize');
const db = require('@models/db');

const Rewards = db.define('rewards', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    claimed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

module.exports = Rewards;
