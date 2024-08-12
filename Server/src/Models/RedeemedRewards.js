const db = require('@models/db');
const { DataTypes } = require('sequelize');
const User = require('./Users');
const Reward = require('./Rewards');

const RedeemedReward = db.define('RedeemedReward', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    rewardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Reward,
            key: 'id',
        },
    },
    claimed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    redeemedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

User.hasMany(RedeemedReward, { foreignKey: 'userId' });
Reward.hasMany(RedeemedReward, { foreignKey: 'rewardId' });
RedeemedReward.belongsTo(User, { foreignKey: 'userId' });
RedeemedReward.belongsTo(Reward, { foreignKey: 'rewardId' });

module.exports = RedeemedReward;
