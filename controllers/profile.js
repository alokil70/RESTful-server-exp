const db = require('../models')
const errorHandler = require('../utils/errorHandler')


module.exports.getOne = async function(req, res) {
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

module.exports.getById = function(req, res) {}

module.exports.remove = function(req, res) {}

module.exports.create = function(req, res) {}

module.exports.update = function(req, res) {}
