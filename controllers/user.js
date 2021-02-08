const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const errorHandler = require('../utils/errorHandler')
require('dotenv').config()


module.exports.getAll = function(req, res) {
    db.User.findAll({
        // where: {ProductId: req.body.category},
        // include: [db.Category]
    }).then(users => {
        res.json(users)
        res.status(200)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.remove = function(req, res) {
    const id = req.params.id
    db.User.destroy({
        where: { id: id }
    }).then(user => {
        res.json(user)
        res.status(200)
    }).catch(err => {
        errorHandler(err, res)
    })
}

module.exports.create = async function(req, res) {
    const candidate = await db.User.findOne({
        where: {email: req.body.email}
    })

    if (candidate != null) {
        res.status(409).json({
            message: 'busy email'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        await db.User.create({
            name: req.body.name,
            company: req.body.company,
            city: req.body.city,
            email: req.body.email,
            admin: req.body.admin,
            token: req.body.token,
            expire: req.body.expire ? req.body.expire : '1970-1-1 00:00:00',
            modules: req.body.modules ? req.body.modules : '1',
            imageName: req.file ? req.file.path : '',
            password: bcrypt.hashSync(password, salt)
        })
            .then(async () => {
                if (await db.User.findOne({
                    where: {email: req.body.email}
                })) {
                    res.status(201).json({
                        message: 'user created'
                    })
                }
            })
            .catch((err) => {
                errorHandler(err, res)
            })
    }
}

module.exports.update = function(req, res) {

}
