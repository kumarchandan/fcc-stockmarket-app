// stores/StockStore.js

import _ from 'underscore'
import AppDispatcher from '../dispatcher/AppDispatcher'
import StockConstants from '../constants/StockConstants'
//
const EventEmitter = require('events').EventEmitter

//
var _stocks = []
var _categories = []
var _series = []
//
function loadStocks(data) {
    _stocks = data
}
//
function addStock(data) {
    if(data) {
        _stocks.push(data)
    }
}
//
function setCategories(dates) {
    _categories
}

// [
//     {
//         name: 'Facebook',   // set from User Input
//         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]    // set from Close -> data[4]
//     },
//     {
//         name: 'Google',
//         data: [9.9, 7.5, 16.4, 29.2, 44.0, 76.0, 15.6, 48.5, 216.4, 294.1, 395.6, 554.4]
//     }
// ]

//
var StockStore = _.extend({}, EventEmitter.prototype, {
    //
    getStocks: function() {
        return _stocks
    },
    //
    emitChange: function() {
        this.emit('StockChange')
    },
    //
    addChangeListener: function(done) {
        this.addListener('StockChange', done)
    },
    //
    removeChangeListener: function(done) {
        this.removeListener('StockChange', done)
    }
})

//
AppDispatcher.register(function(payload) {
    //
    var action = payload.action     // actionType, data
    //
    switch(action.actionType) {
        // Get Stocks
        case StockConstants.GET_STOCKS_RESPONSE:
            loadStocks(action.data)
            StockStore.emitChange()
            break
        case StockConstants.ADD_STOCK_RESPONSE:
            addStock(action.data)
            StockStore.emitChange()
            break
        default:
            break
    }
    return true
})

//
module.exports = StockStore