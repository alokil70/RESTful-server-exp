const routes = {}
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

fs.readdirSync(__dirname)
    .filter((file) => {
        console.log(file)
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-9) === 'routes.js'
        )
    })
    .forEach((file) => {
        let route = file.split('.')[0]
        let filePath = './' + route + '.routes'
        const r = require(filePath)
        routes[path.parse(file).name.toLowerCase()] = r
    })

module.exports = routes
