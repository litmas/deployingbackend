// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/connectToDB');
const carsController = require('./controllers/carController');
const userController = require('./controllers/userController');
const requireAuth = require('./middleware/requireAuth');

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://bilcentertrekanten.netlify.app', // Frontend URL
    credentials: true // Allow credentials (cookies) to be sent
}));

// Connect to database
connectToDB();

// Routing
// Signing up
app.post('/signup', userController.signup);

// Logging in
app.post('/login', userController.login);

// Logging out
app.get('/logout', userController.logout);

// Using middleware to check authorization
app.get('/check-auth', requireAuth, userController.checkAuth);

// Fetching cars
app.get('/cars', carsController.fetchCars);

// Fetching a single car
app.get('/cars/:id', requireAuth, carsController.fetchOneCar);

// Creating car
app.post('/cars', requireAuth, carsController.createCar);

// Updating car
app.put('/cars/:id', requireAuth, carsController.updateCar);

// Deleting car
app.delete('/cars/:id', requireAuth, carsController.deleteCar);

app.get('/health', (req, res) => {
    res.send('OK');
});

// Start our server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
