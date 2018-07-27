const express = require('express')
const Router = express.Router()


Router.get('/info', function (req, res) {
    return res.json({ user: '陈明', code: 200 })
})

module.exports = Router 