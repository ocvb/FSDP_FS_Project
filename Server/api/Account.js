const express = require("express");
const router = express.Router();
const { Users } = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TokenAuthentication } = require("./Middlewares/TokenAuthentication");

function generateToken(user) {
    return jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// User login
router.post("/login", async (req, res) => {
    console.log("User login as", req.body.username)
    const { username, password } = req.body;
    console.log("Username:", username, "Password:", password)
    if (username == undefined || password == undefined || username.length == 0 || password.length == 0) {
        res.json({ status: 401, message: "Invalid username or password" });
        return;
    }

    let findsByUsername = await Users.findOne({ where: { username } });
    if (!findsByUsername) {
        res.status(401).json({ status: 401, message: "Invalid username or password" });
        return;
    }

    bcrypt.compare(password, findsByUsername.password).then(async (result) => {
        if (result) {
            const token = generateToken(findsByUsername);
            res.status(200).json({ status: 200, data: findsByUsername, token });
        } else {
            res.status(401).json({ status: 401, message: "Invalid username or password" })
        }
    }).catch((err) => {
        if (err) {
            res.status(401).json({ status: 401, message: "Invalid username or password" });
            return;
        }
    });

});

// Token authentication
router.get("/auth", TokenAuthentication, async (req, res) => {
    console.log("Checking Authentication")

    const { uuid } = req.user.data;
    let user = await Users.findOne({ where: { uuid } });

    if (!user) {
        res.json({ status: 404, message: "User not found" });
        return;
    }

    if (uuid !== user.uuid) {
        res.json({ status: 401, message: "Invalid token" });
        return;
    }

    res.json({ status: 200, data: req.user.data, token: req.token });
});

router.get('/', TokenAuthentication, async (req, res) => {
    console.log("Get all users")
    const users = await Users.findAll();
    res.status(200).json(users);
});

// User registration
router.post("/register", async (req, res) => {
    console.log("User Registering", req.body.username)
    const { username, password } = req.body;
    const findSameUsername = await Users.findOne({ where: { username } });
    if (findSameUsername) {
        res.status(409).json({ status: "failed", message: "Username already exists" });
        return;
    }

    bcrypt.hash(password, 10).then(async (hash) => {
        const user = await Users.create({ username, password: hash });
        if (user) {
            const token = generateToken(user);
            res.json({ status: "success", data: user, token });
        } else {
            res.sendStatus(500);
        }
    });
});

router.put("/update/:id", TokenAuthentication, async (req, res) => {
    console.log("Update User", req.body.username)
    const { username, password } = req.body;
    const { id } = req.params;

    if (username == undefined || password == undefined) {
        res.json({ status: 401, message: "Invalid username or password" });
        return;
    }
    if (!id > 0) {
        res.json({ status: 401, message: "Invalid uuid" });
        return;
    }

    bcrypt.hash(password, 10).then(async (hash) => {
        let UpdateUserStatus;
        if (password.length == 0) {
            console.log("Update Username only")
            UpdateUserStatus = await Users.update({ username }, { where: { id } }, { returning: true });
        } else {
            console.log("Update Username and Password")
            UpdateUserStatus = await Users.update({ username, password: hash }, { where: { id } }, { returning: true });
        }

        if (UpdateUserStatus == 1) { // update returns an array where the first element is the number of affected rows
            const retrieveUser = await Users.findOne({ where: { id } });
            const token = generateToken(retrieveUser);

            res.json({ status: "success", data: retrieveUser, token });
        } else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
    });
});

router.delete('/delete/:id', TokenAuthentication, async (req, res) => {
    console.log("Delete User", req.params.id)
    const { id } = req.params;
    if (!id > 0) {
        res.json({ status: 401, message: "Invalid uuid" });
        return;
    }

    const deleteUser = await Users.destroy({ where: { id } });
    if (deleteUser == 1) {
        res.json({ status: "success", message: "User deleted" });
    } else {
        res.status(404).json({ status: "error", message: "User not found" });
    }
});

module.exports = router;