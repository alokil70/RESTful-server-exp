const axios = require('axios')
require('dotenv').config()

const URL = 'http://localhost:9099/api/auth-server'
const serverAuth = {}

module.exports.fetchUser = () => {
    return axios({
        method: 'post',
        url: URL + '/login',
        data: {
            "email": process.env.L_USER,
            "password": process.env.L_PASSWORD
        }
    })
}

module.exports.fetchProfile = (token) => {
    return axios({
        method: 'get',
        url: URL + '/user',
        headers: {
            "Authorization": token,
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        res.data.user
    })
}

/*
serverAuth.user = fetchUser
serverAuth.profile = fetchProfile

module.exports = serverAuth
*/
