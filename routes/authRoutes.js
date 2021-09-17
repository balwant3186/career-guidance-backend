const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const authController = require('../controllers/authController')

router.post('/login', authController.login_post)
router.post('/signup', upload.single('image'), authController.signup_post)


module.exports = router