const express = require("express");
const router = express.Router();
const { Users } = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateToken(user) {
    return jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// TODO: Password hashing
router.post("/api/user/login", async (req, res) => {
    console.log("User Logging In", req.body.username)
    const { username, password } = req.body;
    if (username == undefined || password == undefined) {
        res.json({ status: 404, message: "Invalid username or password" });
        return;
    }

    let user = await Users.findOne({ where: { username, password } });
    if (user !== null) {
        const token = generateToken(user);
        res.status(200).json({ status: 200, data: user, token });
    } else {
        res.status(401).json({ status: 401, message: "Invalid username or password" })
    }
});

// Token authentication
router.get("/api/user/auth", async (req, res) => {
    console.log("Checking Authentication")
    const { authorization } = req.headers
    const token = authorization.split(" ")[1];


    if (token == undefined) {
        res.json({ status: 404, message: "token is empty" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        console.log("Decoded:", decoded)
        if (decoded == undefined) { 
            res.json({ status: 404, message: "Invalid token" });
            return;
        }
        console.log("User:", decoded['data'].username)
        const { uuid } = decoded['data']
        let user = await Users.findOne({ where: { uuid } });
        if (err) {
            res.json({ status: 404, message: "Invalid token" });
            return;
        }
        if (uuid !== user.uuid) {
            res.json({ status: 401, message: "Invalid token" });
            return;
        }

        res.json({ status: 200, data: decoded.data, token });
    });
});



router.post("/api/user/register", async (req, res) => {
    console.log("User Registering", req.body.username)
    const { username, password } = req.body;
    const findSameUsername = await Users.findOne({ where: { username } });
    if (findSameUsername) {
        res.json({ status: "failed", message: "Username already exists" });
        return;
    }

    const user = await Users.create({ username, password });
    if (user) {
        const token = generateToken(user);
        res.json({ status: "success", data: user, token });
    } else {
        res.sendStatus(500);
    }
});

// TODO: JWT Authentication
router.put("/api/user/update/:uuid", async (req, res) => {
    console.log("Update User", req.body.username)
    const { username, password } = req.body;
    const { uuid } = req.params;

    if (username == undefined || password == undefined) {
        res.json({ status: 401, message: "Invalid username or password" });
        return;
    }

    if (uuid == undefined) {
        res.json({ status: 401, message: "Invalid uuid" });
        return;
    }

    const UpdateUserStatus = await Users.update({ username, password }, { where: { uuid } }, { returning: true });

    if (UpdateUserStatus == 1) { // update returns an array where the first element is the number of affected rows
        const retrieveUser = await Users.findOne({ where: { uuid } });
        const token = generateToken(retrieveUser);

        res.json({ status: "success", data: retrieveUser, token });
    } else {
        res.status(404).json({ status: "error", message: "User not found" });
    }
});

module.exports = router;