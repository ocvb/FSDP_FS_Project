const db = require('@models/db');
const { DataTypes } = require('sequelize');

const SkillShares = db.define('skillshares', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = SkillShares;
