var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

process.setMaxListeners(0);
io.sockets.setMaxListeners(0);
app.setMaxListeners(0);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(3000);
console.log('Listening on port 3000');

io.sockets.on('connection', function (socket) {
  socket.on('messages.create', function (data) {
    socket.broadcast.emit('message', data);
  });
});
