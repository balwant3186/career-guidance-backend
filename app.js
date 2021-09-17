// package imports
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


// File imports
const authRoutes = require('./routes/authRoutes')


let dbUrl = "mongodb://127.0.0.1:27017/career-guidance"

mongoose.connect(dbUrl)
    .then(result => app.listen(3000))
    .catch(err => console.log(errr))




const app = express()

app.use(express.json())
app.use(cookieParser())


app.get('/health', (req, res) => res.send('true'))

app.use('/auth', authRoutes)

