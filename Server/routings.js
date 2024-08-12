const express = require('express');
const router = express.Router();

const startAPI = require('@endpoints/Api');
router.use('/api', startAPI);

// Add your endpoints here
const userAPI = require('@endpoints/Account');
router.use('/api/user', userAPI);

const eventAPI = require('@endpoints/Events');
router.use('/api/events', eventAPI);

const adminAPI = require('@endpoints/Admin');
router.use('/api/admin', adminAPI);

const facilitiesAPI = require('@endpoints/Facilities');
router.use('/api/facilities', facilitiesAPI);

const skillshareAPI = require('@endpoints/SkillShare');
router.use('/api/skillshare', skillshareAPI);

const coursesAPI = require('@endpoints/Courses');
router.use('/api/courses', coursesAPI);

const supportAPI = require('@endpoints/Support');
router.use('/api/support', supportAPI);

const rewardAPI = require('@endpoints/Rewards');
router.use('/api/rewards', rewardAPI);

const donationAPI = require('@endpoints/Donation');
router.use('/api/donation', donationAPI);

const volunteerAPI = require('@endpoints/Volunteer');
router.use('/api/volunteer', volunteerAPI);

module.exports = router;
