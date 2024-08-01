const db = require('@models/db');

const Users = require('@models/Users');
const Events = require('@models/Events');
const UserEvents = require('@models/UserEvents');
const Facilities = require('@models/Facilities');
const SkillShares = require('@models/SkillShares');
const Courses = require('@models/Courses');
const Support = require('@models/Support');
const Rewards = require('@models/Rewards');

Users.belongsToMany(Events, { through: UserEvents, foreignKey: 'userId' });
Events.belongsToMany(Users, { through: UserEvents, foreignKey: 'eventId' });

module.exports = {
    Users,
    Events,
    UserEvents,
    SkillShares,
    Facilities,
    Courses,
    Support,
    Rewards,
    db,
};
