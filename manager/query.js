// manager/query.js

var StockModel = require('../models/stock')

function getStockCodes(req, res, next) {
    //
    StockModel.find(function(err, codes) {
        if(err) throw err
        //
        if(codes.length !== 0) {
            res.status(200).json({
                data: {
                    codes: codes
                }
            })
        } else {
            res.status(200).json({
                data: {
                    codes: null
                }
            })
        }
    })
}

module.exports = {
    getStockCodes: getStockCodes
}