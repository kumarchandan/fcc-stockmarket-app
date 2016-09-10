// models/stock.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StockSchema = new Schema({
    code: String
})

var StockModel = mongoose.model('Stock', StockSchema)

module.exports = StockModel