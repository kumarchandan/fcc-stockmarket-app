// extAPI.js

module.exports = function(io) {

    var app = require('express')
    var router = app.Router()

    var twitterKeys = require('../config/api.keys').twitter
    var Twitter = require('twitter')

    //
    var client = new Twitter({
        consumer_key: twitterKeys.key,
        consumer_secret: twitterKeys.secret,
        access_token_key: twitterKeys.token,
        access_token_secret: twitterKeys.tokenSecret
    })

    client.stream('statuses/filter', { track: 'javascript' }, function(stream) {
        // Data
        stream.on('data', function(event) {
            console.log(event.text)
            io.emit('tweet', event.text)
        })
        // Error
        stream.on('error', function(err) {
            throw err
        })
    })

    //
    return router
}