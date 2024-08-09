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
const UserSkillshareResponse = require('@models/UserSkillshareResponse');

// User to Events Relation
Users.belongsToMany(Events, { through: UserEvents, foreignKey: 'userId' });
Events.belongsToMany(Users, { through: UserEvents, foreignKey: 'eventId' });

// User to Rewards Relation
Users.belongsToMany(Rewards, { through: UserRewards, foreignKey: 'userId' });
Rewards.belongsToMany(Users, { through: UserRewards, foreignKey: 'rewardId' });

// User to SkillShares Relation
Users.belongsToMany(SkillShares, {
    through: UserSkillshareResponse,
    foreignKey: 'userId',
});
SkillShares.belongsToMany(Users, {
    through: UserSkillshareResponse,
    foreignKey: 'skillshareId',
});

module.exports = {
    Users,
    Events,
    UserEvents,
    UserRewards,
    UserSkillshareResponse,
    SkillShares,
    Facilities,
    Courses,
    Support,
    Rewards,
    db,
};
