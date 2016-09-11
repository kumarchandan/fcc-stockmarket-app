// stores/StockStore.js

import _ from 'underscore'
import AppDispatcher from '../dispatcher/AppDispatcher'
import StockConstants from '../constants/StockConstants'
//
const EventEmitter = require('events').EventEmitter

//
var _series = []
var _names = []
//
function loadSeries(dataset) {
    //
    var data = dataset.data.map(function(stockquotes) {
        var arr = []
        arr.push(stockquotes[0])
        arr.push(stockquotes[4])
        return arr
    })
    //
    _series.push({
        name: dataset.name.split(' ')[0],
        id: dataset.id,
        data: data.reverse()
    })
    //
    _names.push({
        name: dataset.name.split(' ')[0],
        id: dataset.id,
        code: dataset.dataset_code
    })
}

//
var StockStore = _.extend({}, EventEmitter.prototype, {
    //
    getSeries: function() {
        return _series
    },
    //
    getNames: function() {
        return _names
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
            loadSeries(action.data.dataset)
            StockStore.emitChange()
            break
        case StockConstants.ADD_STOCK_RESPONSE:
            StockStore.emitChange()
            break
        default:
            break
    }
    return true
})

//
module.exports = StockStore