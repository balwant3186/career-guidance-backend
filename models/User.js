const mongoose = require('mongoose')
const { isEmail, isMobilePhone } = require('validator')
const bcrypt = require('bcrypt')

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
    image: {
        data: Buffer,
        type: String
    }
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        } else {
            throw Error('incorrect password')
        }
    } else {
        throw Error('incorrect email')
    }
}


userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User