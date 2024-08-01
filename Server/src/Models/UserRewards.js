const { DataTypes } = require('sequelize');
const db = require('@models/db');
const Users = require('@models/Users');
const Rewards = require('@models/Rewards');

const UserRewards = db.define(
    'user_rewards',
    {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id',
            },
            allowNull: false,
        },
        rewardId: {
            type: DataTypes.INTEGER,
            references: {
                model: Rewards,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = UserRewards;
