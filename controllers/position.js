const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = function(req, res) {
    Position.findAll().then((products) => {
        res.json(products)
        res.status(200)
    })
}

module.exports.create = function(req, res) {
    Position.create().then((products) => {
        res.json(products)
        res.status(200)
    })
}

module.exports.remove = function(req, res) {}

module.exports.update = function(req, res) {}
