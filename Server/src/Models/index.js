const db = require('@models/db');

const Users = require('@models/Users');
const Events = require('@models/Events');
const Facilities = require('@models/Facilities');
const SkillShares = require('@models/SkillShares');
const Courses = require('@models/Courses');
const Support = require('@models/Support');
const Rewards = require('@models/Rewards');
const UserEvents = require('@models/UserEvents');
const UserRewards = require('@models/UserRewards');

// User to Events Relation
Users.belongsToMany(Events, { through: UserEvents, foreignKey: 'userId' });
Events.belongsToMany(Users, { through: UserEvents, foreignKey: 'eventId' });

// User to Rewards Relation
Users.belongsToMany(Rewards, { through: UserRewards, foreignKey: 'userId' });
Rewards.belongsToMany(Users, { through: UserRewards, foreignKey: 'rewardId' });

module.exports = {
    Users,
    Events,
    UserEvents,
    UserRewards,
    SkillShares,
    Facilities,
    Courses,
    Support,
    Rewards,
    db,
};
