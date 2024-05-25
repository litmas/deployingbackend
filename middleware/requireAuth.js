const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//
async function requireAuth(req, res, next) {
    try {
    // read token from cookies
    const token = req.cookies.Authorization
    
    // decode the token
    const decoded = jwt.verify(token, process.env.SECRET)

    //check expiration
    if (Date.now() > decoded.exp) {
        return res.sendStatus(401)
    }

    // find user using decodedd sub
    const user = await User.findById(decoded.sub)

    if (!user) {
        return res.sendStatus(401)
    }

    // attatch user to request
    req.user = user

    // continue
    next()
    } catch(error) {
        return res.sendStatus(401)
    }
}

module.exports = requireAuth 