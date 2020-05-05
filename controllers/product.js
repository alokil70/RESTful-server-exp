const db = require('../models')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = function(req, res) {
    db.Product.findAll({
        //where: {ProductId: req.body.category},
        include: [db.Category]
    }).then(products => {
        res.json(products)
        res.status(200)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.remove = function(req, res) {
    const id = req.params.id
    db.Product.destroy({
        where: { id: id }
    }).then(item => {
        res.json(item)
        res.status(200)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.create = function(req, res) {
    db.Product.create({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        CategoryId: req.body.categoryId,
        imageName: req.file ? req.file.filename : ''
    }).then(products => {
        res.json(products)
        res.status(201)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.update = function(req, res) {

}
