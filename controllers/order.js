const db = require('../models')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    await db.Order.findAll({
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

module.exports.create = async (req, res) => {
    console.log('create req.body', req.body)
    const candidate = await db.User.findOne({
        where: { email: req.body.user },
    })

    async function createOrder(idx) {
        console.log('function create Order enter params', idx)
        if (idx !== -1) {
            db.Order.create({
                number: idx,
                user: req.body.user,
                CashShiftId: req.body.CashShiftId,
                UserId: candidate.id,
            })
                .then((items) => {
                    // console.log('then items after db.Order.create', items)
                    res.json(items)
                    res.status(201)
                })
                .catch((err) => {
                    errorHandler(err, res)
                })
        } else res.status(500)
    }

    async function findLastOrderNumber() {
        const order = await db.Order.findAll({
            where: { CashShiftId: req.body.CashShiftId },
        })
        // console.log('findAll orders', order)
        if (order.length !== 0) {
            console.log('enter !== []')
            const sortedByNumber = order.sort((a, b) => a.number - b.number)
            return sortedByNumber[sortedByNumber.length - 1].number
        } else return -1
    }

    async function find() {
        const lastOrderNumber = await findLastOrderNumber()
        console.log('findLastNumber b', lastOrderNumber)
        if (lastOrderNumber === -1) {
            return 1
        } else {
            if (lastOrderNumber) {
                return lastOrderNumber + 1
            } else {
                console.log(
                    'error a !== b',
                    lastOrderNumber[lastOrderNumber.length - 1].number,
                )
                return -1
            }
        }
        // console.log('findLastNumber', lastNumber)
    }
    await find()
        .then((idx) => createOrder(idx))
        .catch((e) => console.log('function find not working', e))
}

module.exports.remove = (req, res) => {
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

module.exports.update = async (req, res) => {
    console.log('update req.body', req.body)
    await db.Order.update(
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
