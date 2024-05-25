const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    title: String,
    body: String,
    imageURL: String,
    regNMR: String,
    year: String,
    mil: Number,
    gearbox: String,    
    drivmedel: String,    
    fordonstyp: String,
    colour: String,
    pris: Number,

})

const Car = mongoose.model('Car', carSchema)

module.exports = Car