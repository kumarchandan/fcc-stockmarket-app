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
        var date = stockquotes[0].split('-')
        arr.push(Date.UTC(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2])))   // the Date - yyyy/mm/dd - some issue with Date.UTC so mm-1
        arr.push(stockquotes[4])    // Closing Value
        return arr
    })
    //
    _series.push({
        name: dataset.name.split(' ')[0],
        code: dataset.dataset_code.toLowerCase(),
        data: data.reverse()
    })
    //
    _names.push({
        name: dataset.name.split(' ')[0],
        code: dataset.dataset_code.toLowerCase()
    })
}

// Remove Stock
function removeFromStock(code) {
    //
    const seriesToDelete = _series.map( (data) => data.code ).indexOf(code)
    _series.splice(seriesToDelete, 1)
    //
    const nameToDelete = _names.map( (data) => data.code ).indexOf(code)
    _names.splice(nameToDelete, 1)
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
        case StockConstants.GET_STOCKS_RESPONSE:    // Add Stock - from Same client or from Broadcasted by other clients
            loadSeries(action.data.dataset)
            StockStore.emitChange()
            break
        case StockConstants.REMOVE_STOCK:
            removeFromStock(action.data)
            StockStore.emitChange()
            break
        default:
            break
    }
    return true
})

//
module.exports = StockStore