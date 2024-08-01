const express = require('express');
const router = express.Router();
const {
    Users,
    Events,
    Courses,
    SkillShares,
    UserEvents,
} = require('@models/index');
const bcrypt = require('bcrypt');
const process = require('process');

const saltRounds = process.env.SALT_ROUNDS || 10;

function genHash(password) {
    return bcrypt.hashSync(password, saltRounds);
}

let userType = {
    Admin: 'Admin',
};

// Check if the server API is running
router.get('/', async (req, res) => {
    const presetUsers = await Users.bulkCreate([
        {
            username: 'admin',
            password: genHash('admin'),
            role: userType.Admin,
        },
        {
            username: 'user',
            password: genHash('user'),
        },
    ]);

    const presetEvents = await Events.bulkCreate([
        {
            title: 'Event 1',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.',
            location: 'Yishun',
            date: new Date(),
            price: 0,
        },
        {
            title: 'Event 2',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.',
            location: 'Yishun',
            date: new Date(),
            price: 0,
        },
        {
            title: 'Event 3',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.',
            location: 'Ang Mo Kio',
            date: new Date(),
            price: 0,
        },
    ]);

    const presetSkillshare = await SkillShares.bulkCreate([
        {
            title: 'How do i start coding',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.',
            postedBy: 'admin',
            category: 'IT',
            numberOfResponded: 5,
        },
        {
            title: 'How to make a cake',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.',
            postedBy: 'admin',
            category: 'Cooking',
            numberOfResponded: 2,
        },
        {
            title: 'How to make a website',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.',
            postedBy: 'admin',
            category: 'IT',
            numberOfResponded: 3,
        },
    ]);

    const presetCourses = await Courses.bulkCreate([
        {
            title: 'Makeup and Skincare',
            category: 'Health & Wellness',
            description:
                'Learn the different types of makeup and how to take care of your skin',
        },
        {
            title: 'Healthy Cooking',
            category: 'Health & Wellness',
            description:
                'Learn how to cook healthy, delicious meals that can contribute to overall wellness and a balanced diet.',
        },
        {
            title: 'Cardio Workout',
            category: 'Sports & Fitness',
            description:
                'This course offers a variety of cardio exercises to help you improve your cardiovascular health and fitness.',
        },
    ]);

    const presetUserEvent = await UserEvents.bulkCreate([
        {
            userId: 1,
            eventId: 1,
        },
        {
            userId: 1,
            eventId: 2,
        },
        {
            userId: 2,
            eventId: 1,
        },
        {
            userId: 2,
            eventId: 2,
        },
    ]);

    presetUsers;
    presetEvents;
    presetSkillshare;
    presetCourses;
    presetUserEvent;

    res.send('API is running, preset data have been loaded.');
});

module.exports = router;
