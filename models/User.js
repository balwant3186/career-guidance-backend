const mongoose = require('mongoose')
const { isEmail, isInt, isMobilePhone } = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [5, "Minimum password length is 5 characters"] 
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone number"],
        validate: [isMobilePhone, 'Please enter a valid phone number']
    },
    school: {
        type: String,
        required: [true, "Please enter a school name"],
    },
    class_number: {
        type: Number,
        required: [true, "Please enter a class number"],
        validate: [Number.isInteger, 'Please enter a valid class number']
    },
    city: {
        type: String,
        required: [true, "Please enter a city name"],
    },
    // image: {
    //     type: String,
    //     validate: [isAlpha, 'Please enter a valid image']
    // }
})


const User = mongoose.model('user', userSchema)

module.exports = User