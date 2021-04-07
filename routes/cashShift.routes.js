const express = require('express')
const controller = require('../controllers/cashShift')
const router = express.Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.post('/delete/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router
