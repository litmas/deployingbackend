//load env variables
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

// import dependencies
const express = require('express')
const cors = require('cors')
const cookieParser  =require('cookie-parser')
const connectToDB = require('./config/connecttoDB')
const carsController = require('./controllers/carController')
const userController = require('./controllers/userController')
const requireAuth = require('./middleware/requireAuth')
require('dotenv').config()

//create an express app
const app = express()

//configure express app
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true 
}))

//connect to database
connectToDB()

// routing      
// Now I have a CRUD application I guess

//signing up
app.post('/signup', userController.signup)

//logging in
app.post('/login', userController.login)

//logging out
app.get('/logout', userController.logout)

// using middleware to check authorization
app.get('/check-auth', requireAuth, userController.checkAuth)

//fetching cars
app.get('/cars', carsController.fetchCars)

//fetching a single car
app.get('/cars/:id', requireAuth, carsController.fetchOneCar)

//creating car
app.post('/cars', requireAuth, carsController.createCar)

//updating car
app.put('/cars/:id', requireAuth, carsController.updateCar)

//deleting car
app.delete('/cars/:id', requireAuth, carsController.deleteCar)

app.get('/health', (req, res) => {
    res.send('OK');
})

// Start our server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
