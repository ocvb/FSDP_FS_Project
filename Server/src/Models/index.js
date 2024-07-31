const db = require('@models/db');

const Users = require('@models/Users');
const Events = require('@models/Events');
const Facilities = require('@models/Facilities');
const SkillShares = require('@models/SkillShares');
const Courses = require('@models/Courses');
const Support = require('@models/Support');

module.exports = {
    Users,
    Events,
    SkillShares,
    Facilities,
    Courses,
    Support,
    db,
};
