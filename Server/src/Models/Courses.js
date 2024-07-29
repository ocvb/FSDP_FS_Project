const { DataTypes } = require('sequelize');
const db = require('@models/db');

const Courses = db.define('courses', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Courses;