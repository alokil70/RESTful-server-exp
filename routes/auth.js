const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/logout', controller.logout)
router.get('/user', controller.findUser)

module.exports = router
