const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function signup(req, res) {
    try {
        // Check the current number of users
        const userCount = await User.countDocuments()
        if (userCount >= 3) {
            return res.status(400).send("Maximum number of accounts reached.")
        }

        // Get the email and password from req body
        const { email, password } = req.body

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10)

        // Create a user with the data
        await User.create({ email, password: hashedPassword })

        // Respond
        res.sendStatus(200)
    } catch (error) {


        console.log('BLUP BLUP PULL UP', error)
        res.sendStatus(400)
    }
}

async function login(req, res) {
    try {
    //get the email and password off of req body
    const {email, password} = req.body
    //find the user with the requested email
    const user = await User.findOne({email})
    

    //compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch){
        return res.sendStatus(401)
    }
    //create a JWT token becauase they have valid credentials
    const exp = Date.now() + 1000 * 60 * 60 * 24
    var token = jwt.sign({ sub: user._id, exp }, process.env.SECRET)    //sub is the user and exp is the expiration date of the token
    
    //set the cookie
    res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true, 
        sameSite: 'lax',    // should probably have true here but need to do more research on this
        secure: process.env.NODE_ENV === 'produciton'
    })
    
    //send it 
    res.sendStatus(200)
    } catch(error) {
        console.log('Error logging in', error)
        res.sendStatus(400)
    }
}

function checkAuth(req, res) {
    try {
    console.log(req.user)
    res.sendStatus(200)
    } catch(error) {
        console.log('Error checking auth', error)
        res.sendStatus(400)
     }
}

function logout(req, res) {
    try {
    res.clearCookie('Authorization')
    res.sendStatus(200 )
    } catch(error) {
        console.log('error logging out', error)
        res.sendStatus(400)
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
}
