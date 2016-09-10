// extAPI.js

module.exports = function(io) {

    var app = require('express')
    var router = app.Router()
    //
    var query = require('../manager/query')

    // router.get('/codes', query.getStockCodes)

    //
    return router
}