// manager/query.js

var StockModel = require('../models/stock')

function getStocks(req, res, next) {
    //
    StockModel.find({ type: 'stock'}, function(err, stocks) {
        //
        if(err) throw err
        //
        if(stocks && stocks.length !== 0) {
            res.status(200).json({
                codes: stocks[0].codes
            })
        }
    })
}

//
module.exports = {
    getStocks: getStocks
}