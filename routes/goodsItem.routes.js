const express = require('express')
const controller = require('../controllers/goodsItem')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAll,
)
router.post(
    '/',
    upload.single('image'),
    passport.authenticate('jwt', { session: false }),
    controller.create,
)
router.post(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    controller.remove,
)
router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.update,
)

module.exports = router
