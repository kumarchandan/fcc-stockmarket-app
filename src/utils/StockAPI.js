// utils/StockAPI.js

var key = 'A1MhWv1BvseRDS2DzU4w'
var request = require('superagent')
const url = 'https://www.quandl.com/api/v3/datasets/WIKI/'

import StockServerActions from '../actions/StockServerActions'

//
var StockAPI = {
    // Get Latest available date
    _getLatestDate: function(done) {
        //
        request.get(url + 'GOOG/metadata.json?api_key=' + key).end(function(err, res) {
            if(err) throw err
            //
            var end_date = res.body.dataset.newest_available_date
            var date = new Date(end_date)
            date.setFullYear(date.getFullYear() - 1)
            var start_date = (new Date(date)).toISOString().slice(0, 10)

            done(end_date, start_date)
        })
        
    },
    // Input: Code, Ouput: StockQoute
    getStocks: function(code) {
        //
        this._getLatestDate(function(end_date, start_date) {
            // Get Quandl API Stock Quotes
            request.get(url + code + '.json?api_key=' + key + '&end_date=' + end_date + '&start_date=' + start_date).end(function(err, res) {
                if(err) throw err
                //
                StockServerActions.getStocks(res.body)   // datasets or quandl_error
            })
        })
    },
    // Load existing stock codes from db
    loadStocks: function() {
        //
        var that = this
        //
        request.get('api/stocks').end(function(err, res) {
            //
            if(err) throw err
            //
            if(res.body.codes && res.body.codes.length !== 0) {
                res.body.codes.forEach(function(code, index) {
                    that.getStocks(code)
                })
            }
        })
    }
}
//
module.exports = StockAPI