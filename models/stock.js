// models/stock.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StockSchema = new Schema({
    type: String,
    codes: []
})
//
module.exports = mongoose.model('Stock', StockSchema)