const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./models')
const path = require('path')
const fs = require('fs')

const serverAuth = require('./middleware/serv-auth')

require('dotenv').config()
const PORT = process.env.SERVER_PORT || 9009

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())

if (path.dirname('uploads')) {
    fs.mkdir(path.join(__dirname, 'uploads'), (err) => {})
}

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const productsRoutes = require('./routes/products')

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/products', productsRoutes)

let token = null
let user = {}

async function fetchL() {
    token = await serverAuth.fetchUser()
    user = await serverAuth.fetchProfile(token)
}

function srv() {
    if (token) {
        if (new Date(user.expire) > new Date()) {
            db.sequelize
                .sync()
                .then(() => {
                    app.listen(PORT, () =>
                        console.log('Started on port: ' + PORT),
                    )
                })
                .catch((e) => console.log('error started exp', e))
        } else {
            console.log('License expired...')
        }
    } else {
        console.log('License not found...')
    }
}

fetchL()
    .then(() => srv())
    .catch(() => {
        console.log('error fetch')
    })
