const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.get('/user', controller.findUser)
// router.get('/serv-user', controller.fetchServUser)
router.post('/login', controller.login)
// router.post('/register', controller.register)
router.post('/logout', controller.logout)

module.exports = router
