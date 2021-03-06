const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = (req, res) => {
    db.Category.findAll({
        //where: {ProductId: req.body.category},
        //include: [db.Category]
    })
        .then((category) => {
            res.json(category)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.getById = (req, res) => {}

module.exports.remove = (req, res) => {
    const id = req.params.id
    db.Category.destroy({
        where: { id: id },
    })
        .then((item) => {
            res.json(item)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.create = (req, res) => {
    console.log(req.body)
    db.Category.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.path : '',
    })
        .then((products) => {
            res.json(products)
            res.status(201)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.update = (req, res) => {}
