const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    await db.Semis.findAll({
        //where: {ProductId: req.body.category},
        include: [db.SemisCategory],
    })
        .then((item) => {
            res.json(item)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.remove = async (req, res) => {
    // console.log(req.body)
    const id = req.params.id
    await db.Semis.destroy({
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
    await db.Semis.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        SemisCategoryId: req.body.semisCategoryId,
        image: req.file ? req.file.filename : '',
    })
        .then((item) => {
            res.json(item)
            res.status(201)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.update = async (req, res) => {
    const id = req.params.id
    // console.log(req.body)
    await db.Semis.update(
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            GoodsCategoryId: req.body.goodsCategoryId,
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
