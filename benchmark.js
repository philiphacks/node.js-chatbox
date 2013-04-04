var io = require('socket.io-client');

var i, clients = 0, sent = 0, received = 0;

var TOTAL_CLIENTS = process.argv[2] || 10000;

console.log("Total clients: " + TOTAL_CLIENTS);

console.log("\nclients\tsent\treceived\tsent/c\treceived/c");

setInterval(function() {
  console.log([clients, sent, received, '',
    Math.round(sent/clients), Math.round(received/clients)].join("\t"));
  sent = 0;
  received = 0;
}, 1000);

function sendMessage(socket) {
  socket.emit('messages.create', {'name':'john', 'content':'meh'}, function() {
    console.log('Sent message');
    ++sent;
    sendMessage(socket);
  });
}

function connectClient(i) {
  setTimeout(function() {
    var socket = io.connect('http://localhost:3000', { 'force new connection': true });
    ++clients;
    socket.on('message', function(msg) {
      socket.emit('messages.create', msg);
      ++received;
    });
    sendMessage(socket);
  }, i*10);
}

for (i=0; i<TOTAL_CLIENTS; ++i) {
  connectClient(i);
}
