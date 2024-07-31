const db = require('@models/db');

const Users = require('@models/Users');
const Events = require('@models/Events');
const Facilities = require('@models/Facilities');
const SkillShares = require('@models/SkillShares');
const Courses = require('@models/Courses');
const Rewards = require('@models/Rewards');

module.exports = {
    Users,
    Events,
    SkillShares,
    Facilities,
    Courses,
    Rewards,
    db,
};
