var express = require('express')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io').listen(server)

user = []
connections = []

server.listen(process.env.PORT || 3000);
console.log('server running....')


app.get('/' ,function(req,res){
    res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('connected %s sockets connected',connections.length);

    // Disconnect
    socket.on('disconnect' ,function(data){
        connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected : %s sockests connected',connections.length);
    })

    //send message
    socket.on('send message',function(data){
        io.sockets.emit('new message',{msg : data});
    })
    
})