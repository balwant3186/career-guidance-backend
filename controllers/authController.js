
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {

    console.log(err)

    const errors = {
        email: '',
        password: '',
        name: '',
        school: '',
        class_number: '',
        city: '',
        phone: ''
    }

    if(err.message === "incorrect email") {
        errors.email = "That email is not registered"
    }

    if(err.message === "incorrect password") {
        errors.password = "That password is incorrect"
    }

    if(err.code === 11000) {
        errors.email = "That email is already registered"
        return errors
    }

    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
    
}

const maxAge = 3 * 24 * 60 * 60


const createToken = (id) => {
    return jwt.sign({ id }, 'The Beast King', {
        expiresIn: maxAge
    })
}

const login_post = async (req, res) => {

    const { email, password } = req.body
    try {   
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
    
    
}

const signup_post = async (req, res) => {
    const { name, email, password, phone, class_number, school, city, image } = req.body
    
    try {
        const user = await User.create({
            name,
            email,
            password,
            phone,
            class_number, 
            school,
            city,
            image
        })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).send({ errors })
    }

}


module.exports = {
    login_post,
    signup_post
}