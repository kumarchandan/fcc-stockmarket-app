// utils/StockAPI.js

var key = require('.././config/api.keys').quandl.key
var request = require('superagent')
const url = 'https://www.quandl.com/api/v3/datasets/WIKI/'

import StockServerActions from '../actions/StockServerActions'

//
var StockAPI = {
    // Get Latest available date
    getLatestDate: function(done) {
        //
        request.get(url + 'GOOG/metadata.json?api_key=' + key).end(function(err, res) {
            if(err) throw err
            //
            var end_date = res.dataset.newest_available_date
            var date = new Date(end_date)
            date.setFullYear(date.getFullYear() - 1)
            var start_date = (new Date(date)).toISOString().slice(0, 10)
        })
        done(end_date, start_date)
    },
    // Input: Code, Ouput: StockQoute
    getStocks: function(code) {
        //
        this.getLatestDate(function(end_date, start_date) {
            request.get(url + code + '.json?api_key=' + key + '&end_date=' + end_date + '&start_date=' + start_date).end(function(err, res) {
                if(err) throw err
                //
                StockServerActions.getStocks(res)   // datasets or quandl_error
            })
        })
    }
}