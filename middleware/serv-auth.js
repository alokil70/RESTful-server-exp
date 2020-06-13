const axios = require('axios')
require('dotenv').config()

const URL = process.env.FETCH_URL

module.exports.fetchUser = () => {
    return axios({
        method: 'post',
        url: URL + '/login',
        data: {
            "email": process.env.L_USER,
            "password": process.env.L_PASSWORD
        }
    }).then(res => res.data.token)
}

module.exports.fetchProfile = (token) => {
    return axios({
        method: 'get',
        url: URL + '/user',
        headers: {
            "Authorization": token,
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data.user)
}
