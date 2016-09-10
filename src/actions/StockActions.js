// actions/StockActions.js

import AppDispatcher from '../dispatcher/AppDispatcher'
import StockAPI from '../utils/StockAPI'
import StockConstants from '../constants/StockConstants'

var StockActions = {
    //
    getStocks: function(code) {
        AppDispatcher.handleAction({
            actionType: StockConstants.GET_STOCKS
        })
        //
        StockAPI.getStocks(code)
    }
}
//
module.exports = StockActions