// routes/api.js

var query = require('../manager/query')
var express = require('express')
var router = express.Router()

// GET
router.get('/stocks', query.getStocks)

module.exports = router