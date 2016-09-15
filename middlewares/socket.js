// middlewares/socket.js

var StockModel = require('../models/stock')

module.exports = function(io) {
    //
    io.on('connection', function(socket) {
        //
        socket.on('update', function(data) {    // data.code
            socket.broadcast.emit('broadcast', data)
            // Update db
            StockModel.update({ type: 'stock'}, { $push: { codes: data.code } }, {upsert: true}, function(err, doc) {
                //
                if(err) throw err
                if(doc) {
                    console.log('Stock code inserted : ',data.code)
                }
            })
        })
        //
        socket.on('remove', function(data) {    // data.code
            socket.broadcast.emit('removal', data)
            StockModel.update({ type: 'stock'}, { $pull: { codes: data.code } }, function(err, doc) {
                //
                if(err) throw err
                if(doc) {
                    console.log('Stock code removed: ', data.code)
                }
            })
        })
    })
}