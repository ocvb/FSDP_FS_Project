const db = require('@models/db');
const { DataTypes } = require('sequelize');

const Courses = db.define('courses', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Courses;