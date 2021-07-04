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

/*fs.readdirSync(__dirname + '/routes')
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-9) === 'routes.js'
        )
    })
    .forEach((file) => {
        let route = file.split('.')[0]
        let api = '/api/' + route
        let filePath = './routes/' + route + '.routes'
        console.log(filePath)
        let temp = require(filePath.toString())
        console.log('cdcdcdcdcdcdcdcdcdc', temp)
        app.use(api.toString, temp)
    })*/

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/analytics', require('./routes/analytics'))
app.use('/api/category', require('./routes/category.routes'))
app.use('/api/goodsCategory', require('./routes/goodsCategory.routes'))
app.use('/api/semisCategory', require('./routes/semisCategory.routes'))
app.use('/api/order', require('./routes/order.routes'))
app.use('/api/cashShift', require('./routes/cashShift.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/goodsItem', require('./routes/goodsItem.routes'))
app.use('/api/semis', require('./routes/semis.routes'))

/*const authRoutes = require('./routes/auth.routes')
console.log('routessssssssssss', authRoutes)
const userRoutes = require('./routes/user.routes')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category.routes')
const goodsCategoryRoutes = require('./routes/goodsCategory.routes')
const orderRoutes = require('./routes/order.routes')
const cashShiftRoutes = require('./routes/cashShift.routes')
const productsRoutes = require('./routes/products.routes')
const goodsItemRoutes = require('./routes/goodsItem.routes')*/

let token = null
let user = {}

async function fetchL() {
    token = await serverAuth.fetchUser()
    user = await serverAuth.fetchProfile(token)
}

function srv() {
    if (!token) {
        if (new Date(user.expire) > new Date()) {
            db.sequelize
                .sync({
                    force: false,
                })
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

/*fetchL()
    .then(() => srv())
    .catch(() => {
        console.log('error fetch')
    })*/

db.sequelize
    .sync({
        force: false,
    })
    .then(() => {
        app.listen(PORT, () => console.log('Started on port: ' + PORT))
    })
    .catch((e) => console.log('error started exp', e))
