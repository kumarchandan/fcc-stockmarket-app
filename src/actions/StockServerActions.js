// actions/StockServerActions.js

//
import AppDispatcher from '../dispatcher/AppDispatcher'
import StockConstants from '../constants/StockConstants'

var StockServerActions = {
    //
    getStocks: function(data) {
        AppDispatcher.handleServerAction({
            actionType: StockConstants.GET_STOCKS_RESPONSE,
            data: data
        })
    }
}
//
module.exports = StockServerActions