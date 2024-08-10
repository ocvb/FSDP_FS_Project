const { DataTypes } = require('sequelize');
const db = require('@models/db');

const UserSkillshareResponse = db.define(
    'user_skillshare_response',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        skillshareId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        response: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = UserSkillshareResponse;
