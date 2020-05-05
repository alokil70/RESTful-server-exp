const express = require('express')
const controller = require('../controllers/product')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()

router.get(
    '/',
    //passport.authenticate('jwt', {session: false}),
    controller.getAll)

router.post('/',
    upload.single('image'),
    //passport.authenticate('jwt', {session: false}),
    controller.create)

router.post('/delete/:id', controller.remove)

router.patch('/:id', controller.update)

module.exports = router
