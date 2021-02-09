const db = require('../models')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = function(req, res) {
    db.Category.findAll({
        //where: {ProductId: req.body.category},
        //include: [db.Category]
    }).then(category => {
        res.json(category)
        res.status(200)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.getById = function(req, res) {}

module.exports.remove = function(req, res) {
    const id = req.params.id
    db.Category.destroy({
        where: { id: id }
    }).then(item => {
        res.json(item)
        res.status(200)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.create = function(req, res) {
    console.log(req.body)
    db.Category.create({
        categoryName: req.body.categoryName,
        description: req.body.description,
        imageName: req.file ? req.file.path : ''
    }).then((products) => {
        res.json(products)
        res.status(201)
    }).catch((err) => {
        errorHandler(err, res)
    })
}

module.exports.update = function(req, res) {}
