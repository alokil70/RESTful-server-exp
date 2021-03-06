const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = function (req, res) {
    db.Order.findAll({
        //where: {ProductId: req.body.category},
        //include: [db.Category],
    })
        .then((items) => {
            res.json(items)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.create = async function (req, res) {
    console.log(req.body)
    const candidate = await db.User.findOne({
        where: { email: req.body.user },
    })
    const findLastOrderNumber = await db.Order.findAll({
        where: { CashShiftId: req.body.CashShiftId },
    })
    const lastNumber = findLastOrderNumber[findLastOrderNumber.length - 1]
    let idx = 1
    if (lastNumber) {
        idx = lastNumber.number + 1
    }
    db.Order.create({
        number: idx,
        user: req.body.user,
        positions: req.body.cart,
        CashShiftId: req.body.CashShiftId,
        UserId: candidate.id,
    })
        .then((items) => {
            res.json(items)
            res.status(201)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.remove = function (req, res) {
    const id = req.params.id
    db.Product.destroy({
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

module.exports.update = function (req, res) {
    console.log(req.body)
    db.Order.update(
        {
            user: req.body.user,
            positions: req.body.positions,
            isPayed: req.body.isPayed,
            totalCostOrder: req.body.totalCostOrder,
        },
        { where: { id: req.params.id } },
    )
        .then((items) => {
            res.json(items)
            res.status(201)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}
