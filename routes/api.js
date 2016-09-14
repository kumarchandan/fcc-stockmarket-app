// api.js

module.exports = function(io) {

    var app = require('express')
    var router = app.Router()

    // socket connection
    io.on('connection', function(socket) {
        //
        socket.on('update', function(data) {
            socket.broadcast.emit('broadcast', data)
        })
    })

    //
    return router
}