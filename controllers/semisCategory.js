const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = (req, res) => {
    db.SemisCategory.findAll({
        //where: {ProductId: req.body.category},
        //include: [db.Category]
    })
        .then((item) => {
            res.json(item)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.getById = (req, res) => {}

module.exports.remove = (req, res) => {
    const id = req.params.id
    db.SemisCategory.destroy({
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
    db.SemisCategory.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.path : '',
    })
        .then((item) => {
            res.json(item)
            res.status(201)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.update = (req, res) => {}
