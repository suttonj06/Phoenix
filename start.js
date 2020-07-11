var express = require('express');
var app = express();
var serv = require('http').Server(app);
 
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
serv.listen(process.env.PORT || 5000);
console.log("Server started");
 
 
var io = require('socket.io')(serv,{});
io.sockets.on('connection', (socket) => {
    console.log("Player Connected.  Issuing ID");
    var givenID = Math.ceil(Math.random() * 10);
    socket.emit('playerID', { ID: givenID });
    console.log('Player ' + givenID + ' has joined.');
 
    socket.on('attack', (data) => {
        console.log('Player ' + data.ID + ' is attacking');
    });   
});