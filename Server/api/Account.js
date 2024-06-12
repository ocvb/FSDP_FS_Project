const express = require("express");
const router = express.Router();
const { Users } = require("../model");

// TODO: JWT Authentication, Password hashing

router.post("/api/user", async (req, res) => {
    const { username, password, uuid } = req.body;
    var user;
    if (uuid) {
        user = await Users.findOne({ where: { uuid } });
    } else {
        user = await Users.findOne({ where: { username, password } });
    }

    if (user) {
        res.json({ status: "success", data: user });
    } else {
        res.json({ status: "error", message: "Invalid username or password" })
    }
});

router.post("/api/user/register", async (req, res) => {
    const { username, password } = req.body;
    const findSameUsername = await Users.findOne({ where: { username } });
    if (findSameUsername) {
        res.json({ status: "failed", message: "Username already exists" });
        return;
    }

    const user = await Users.create({ username, password });
    if (user) {
        res.json({ status: "success", data: user });
    } else {
        res.sendStatus(500);
    }
});

router.put("/api/user/update/:uuid", async (req, res) => {
    const { username, password } = req.body;
    const { uuid } = req.params;

    try {
        const user = await Users.update({ username, password }, { where: { uuid } }, { returning: true });

        if (user == 1) { // update returns an array where the first element is the number of affected rows
            res.json({ status: "success", data: user });
        } else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "An error occurred while updating the user" });
    }
});

module.exports = router;