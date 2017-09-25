const path = require('path');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	// socket.emit('newEmail', {
	// 	name: "dennis",
	// 	text: "peter",
	// 	time: "123"
	// }); 


	socket.on('emailCreated', (emailContent) => {
		
		console.log('emailCreated', emailContent);
	});

	socket.on('sendMessage', (message) => {
		console.log('new message written', message);
		var timer = Date.now();

		socket.emit('newMessage', {
		from: message.from,
		text: message.text,
		timestamp: timer
		});
	});

	socket.on('disconnect', (socket) =>{
		console.log('client disconnnected');
	})
});

server.listen(port, () => {
  console.log(`Server is up on the amazing port ${port}`);
});