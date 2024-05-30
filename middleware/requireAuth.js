const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function requireAuth(req, res, next) {
    try {
        // Read token from cookies
        const token = req.cookies.Authorization;

        if (!token) {
            return res.sendStatus(401);
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.SECRET);

        // Check expiration (exp is in seconds, Date.now() is in milliseconds)
        if (Date.now() >= decoded.exp * 1000) {
            return res.sendStatus(401);
        }

        // Find user using decoded.sub
        const user = await User.findById(decoded.sub);

        if (!user) {
            return res.sendStatus(401);
        }

        // Attach user to request
        req.user = user;

        // Continue
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;
