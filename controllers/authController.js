
const User = require('../models/User')


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

const login_post = (req, res) => {
    console.log(req.body)
    res.send('login completed')
}

const signup_post = async (req, res) => {
    const { name, email, password, phone, class_number, school, city } = req.body
    
    try {
        const user = await User.create({
            name,
            email,
            password,
            phone,
            class_number, 
            school,
            city
        })
        res.status(201).json({ user: user })
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