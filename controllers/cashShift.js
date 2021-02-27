const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = function (req, res) {
    db.CashShift.findAll({
        // where: {ProductId: req.body.category},
        // include: [db.Category],
    })
        .then((items) => {
            res.json(items)
            res.status(200)
        })
        .catch((err) => {
            errorHandler(err, res)
        })
}

module.exports.create = function (req, res) {
    async function createShift(num) {
        await db.CashShift.create({
            number: num,
            isOpen: true,
        })
            .then((items) => {
                res.json(items)
                res.status(201)
            })
            .catch((err) => {
                errorHandler(err, res)
            })
    }

    async function getNumber() {
        await db.CashShift.findAll({
            // where: {ProductId: req.body.category},
            // include: [db.Category],
        }).then((items) => {
            console.log(items)
            let number = items.length
            if (number === 0) {
                createShift(1)
            } else {
                createShift(number + 1)
            }
            return items.length
        })
    }
    getNumber()
}

module.exports.remove = function (req, res) {
    const id = req.params.id
    db.CashShift.destroy({
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
    const id = req.params.id
    db.CashShift.update(
        { isOpen: false, manager: req.body.manager, total: req.body.total },
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
