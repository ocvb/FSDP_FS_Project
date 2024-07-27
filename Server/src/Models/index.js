const db = require('@models/db');

const Users = require('@models/Users');
const Events = require('@models/Events');
const Facilities = require('@models/Facilities');
const SkillShares = require('@models/SkillShares');
const Courses = require('@models/Courses');

Users.hasMany(Events, {
    foreignKey: 'userId',
});
Events.belongsTo(Users, {
    foreignKey: 'userId',
    constraints: false,
    allowNull: true,
});

module.exports = {
    Users,
    Events,
    SkillShares,
    Facilities,
    Courses,
    db,
};
