const jwt = require('jsonwebtoken')


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, 'The Beast King', (err, decodedToken) => {
            if(err) {
                res.redirect('/')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }

    
}

module.exports = requireAuth