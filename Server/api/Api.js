const express = require("express");
const router = express.Router();
const { Users, Events } = require("../model");

// Check if the server API is running
router.get("/api", async (req, res) => {
    const presetUsers = await Users.bulkCreate([
        {
            username: "admin",
            password: "admin",
            role: "admin",
        },
        {
            username: "user",
            password: "user",
        }
    ]);

    const presetEvents = await Events.bulkCreate([
        {
            title: "Event 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.",
            location: "Location 1",
            date: new Date(),
            price: 0,
        },
        {
            title: "Event 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.",
            location: "Location 2",
            date: new Date(),
            price: 0,
        },
        {
            title: "Event 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.",
            location: "Location 3",
            date: new Date(),
            price: 0,
        },
    ]);
    presetUsers;
    presetEvents;

    res.send("API is running, preset data have been loaded.");
});


module.exports = router;