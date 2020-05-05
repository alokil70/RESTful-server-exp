const express = require('express')
const controller = require('../controllers/profile')
const passport = require('passport')
const router = express.Router()

router.get(
    '/',
    //passport.authenticate('jwt', { session: false }),
    controller.getOne
)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.patch('/:id', controller.update)

module.exports = router
