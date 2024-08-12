const { DataTypes } = require('sequelize');
const db = require('@models/db');

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'member',
        allowNull: false,
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 500,
        allowNull: false,
    },
});

module.exports = Users;
