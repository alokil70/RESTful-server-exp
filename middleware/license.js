const axios = require('axios')

const user = axios({
    method: 'post',
    url: 'http://localhost:9099/api/user',
    data: {
        "name": "Vasiliy",
        "companyName": "OOO Cock",
        "city": "Moscow",
        "email": "vasiliy@gmail.com",
        "password": "qwertyuiop",
        "admin": "false"
    }
})

module.exports = user
