const Car = require('../models/carModel')

const fetchCars = async (req, res) => {
    //find the cars
    const cars = await Car.find()
    // respond with them
    res.json({cars})
}

const fetchOneCar = async (req, res) => {
    //get id off the url
    const carId = req.params.id
    // find the car using id
    const car = await Car.findById(carId)
    //respond with the car
    res.json({car})
}

const createCar = async (req, res) => {
    const carId = req.params.id;
    // Validate req.body
    if (!req.body.title || !req.body.body || !req.body.imageURL || !req.body.regNMR || !req.body.year || !req.body.mil || !req.body.gearbox || !req.body.drivmedel || !req.body.fordonstyp || !req.body.colour || !req.body.pris) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create a new car
    const newCar = new Car({
        title: req.body.title,
        body: req.body.body,
        imageURL: req.body.imageURL,
        regNMR: req.body.regNMR,
        year: req.body.year,
        mil: req.body.mil,
        gearbox: req.body.gearbox,
        drivmedel: req.body.drivmedel,
        fordonstyp: req.body.fordonstyp,  
        colour: req.body.colour,
        pris: req.body.pris
    });

    // Save the new car
    const savedCar = await newCar.save();

    // Respond with the saved car
    res.json({ car: savedCar });
}

const updateCar = async (req, res) => {
    const carId = req.params.id;
    // Validate req.body
    if (!req.body.title || !req.body.body || !req.body.imageURL || !req.body.regNMR || !req.body.year || !req.body.mil || !req.body.gearbox || !req.body.drivmedel || !req.body.fordonstyp || !req.body.colour || !req.body.pris) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    // Find and update the car
    const updatedCar = await Car.findByIdAndUpdate(carId, {
        title: req.body.title,
        body: req.body.body,
        imageURL: req.body.imageURL,
        regNMR: req.body.regNMR,
        year: req.body.year,
        mil: req.body.mil,
        gearbox: req.body.gearbox,
        drivmedel: req.body.drivmedel,
        fordonstyp: req.body.fordonstyp,  
        colour: req.body.colour,
        pris: req.body.pris
    }, { new: true }) // { new: true } returns the updated document

    if (!updatedCar) {
        return res.status(404).json({ error: 'Car not found' })
    }

    // Respond with the updated car
    res.json({ car: updatedCar })
}

const deleteCar =  async (req, res) => {
    //get id off of URL
    const carId = req.params.id 
    //delete the record
    await Car.deleteOne({_id: carId})
    //respond
    res.json({ success: 'record deleted'})
}

module.exports = {
    fetchCars,
    fetchOneCar,
    createCar,
    updateCar,
    deleteCar
}