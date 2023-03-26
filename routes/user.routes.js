const express = require('express')
const controller = require('../controllers/user')
const passport = require('passport')
const upload = require('../middleware/upload')
const cors = require('cors')
const router = express.Router()

router.get(
    '/',
    cors(),
    passport.authenticate('jwt', { session: false }),
    controller.getAll,
)

router.post(
    '/',
    cors(),
    upload.single('image'),
    // passport.authenticate('jwt', { session: false }),
    controller.create,
)

router.post(
    '/delete/:id',
    cors(),
    upload.single('image'),
    passport.authenticate('jwt', { session: false }),
    controller.remove,
)

router.patch('/:id', controller.update)

module.exports = router
