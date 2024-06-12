const express = require("express");
const router = express.Router();
const { Users } = require("../model");

router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username, password } });
    if (user) {
        res.json({ status: "success", data: user });
    } else {
        res.sendStatus(401);
    }
});

router.post("/api/register", async (req, res) => {
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

module.exports = router;