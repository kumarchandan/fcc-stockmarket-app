// actions/StockActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import StockAPI from '../utils/StockAPI'
import StockConstants from '../constants/StockConstants'

var StockActions = {
    // Get Stocks
    getStocks: function(code) {
        AppDispatcher.handleAction({
            actionType: StockConstants.GET_STOCKS
        })
        //
        StockAPI.getStocks(code)
    },
    // Remove Stock
    removeStock: function(code) {
        AppDispatcher.handleAction({
            actionType: StockConstants.REMOVE_STOCK,
            data: code
        })
    }
}
//
module.exports = StockActions