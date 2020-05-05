const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const errorHandler = require('../utils/errorHandler')
require('dotenv').config()

module.exports.login = async function(req, res) {
    const candidate = await db.User.findOne({
        where: { email: req.body.email }
    })

    if (candidate != null) {
        const passwordResult = bcrypt.compareSync(
            req.body.password,
            candidate.password
        )
        if (passwordResult) {
            const token = jwt.sign(
                {
                    email: candidate.email,
                    id: candidate.id
                },
                process.env.JWT,
                { expiresIn: 60 * 60 }
            )
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Не верный пароль'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь не найден'
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await db.User.findOne({
        where: { email: req.body.email }
    })

    if (candidate != null) {
        res.status(409).json({
            message: 'есть такой email'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
            .then(
                res.status(201).json({
                    message: 'user created'
                })
            )
            .catch((err) => {
                errorHandler(err, res)
            })
    }
}

module.exports.logout = function(req, res) {
    res.status(200).json({
        message: 'logout'
    })
}

module.exports.findUser = async function(req, res) {
    //db.User.findOne({
    let response = req.headers.authorization
    res.status(200).json({
        user: {
            token: response
        }
    })
    //where: {ProductId: req.body.category},
    //include: [db.Category]
    // }).then(item => {
    //     res.json(item)
    //     res.status(200)
    // }).catch(err => {
    //     errorHandler(err, res)
    // })
}
