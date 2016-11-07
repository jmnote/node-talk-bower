var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static( __dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('message', function(msg){
		io.emit('message', msg);
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
