const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../models')
require('dotenv').config()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, function(payload, done) {
            db.User.findOne({ where: { id: payload.id } })
                .then((user) => {
                    return done(null, user)
                })
                .catch(() => {
                    return done(null, false)
                })
        })
    )
}
