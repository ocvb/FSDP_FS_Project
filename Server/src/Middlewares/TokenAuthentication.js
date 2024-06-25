const jwt = require('jsonwebtoken');
const process = require('process');

const TokenAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: "Invalid Token or No Token" });

    console.log("Checking Token Authentication...")

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid Token" });
        console.log("Passed Token Authentication...")
        req.user = user;
        req.token = token;
        next();
    });
}

module.exports = { TokenAuthentication };