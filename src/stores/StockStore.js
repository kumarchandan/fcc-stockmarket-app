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
        arr.push(Date.UTC(parseInt(date[0]),parseInt(date[1]),parseInt(date[2])))   // the Date
        arr.push(stockquotes[4])    // Closing Value
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

// Remove Stock
function removeFromStock(id) {
    //
    const seriesToDelete = _series.map( (data) => data.id ).indexOf(id)
    _series.splice(seriesToDelete, 1)
    //
    const nameToDelete = _names.map( (data) => data.id ).indexOf(id)
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