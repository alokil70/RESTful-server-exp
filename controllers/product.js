const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    await db.Product.findAll({
        //where: {ProductId: req.body.category},
        include: [db.Category],
    })
        .then((products) => {
            res.json(products)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.remove = async (req, res) => {
    // console.log(req.body)
    const id = req.params.id
    await db.Product.destroy({
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

module.exports.create = async (req, res) => {
    // console.log(req.body)
    await db.Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        CategoryId: req.body.categoryId,
        image: req.file ? req.file.filename : '',
    })
        .then((products) => {
            res.json(products)
            res.status(201)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.update = async (req, res) => {
    const id = req.params.id
    // console.log(req.body)
    await db.Product.update(
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            CategoryId: req.body.categoryId,
            image: req.file ? req.file.filename : '',
        },
        {
            where: { id: id },
        },
    )
        .then((item) => {
            res.json(item)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}
