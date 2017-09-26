const path = require('path');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var usersOnline = 0;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	usersOnline++;
	console.log('new user connected, total users: ', usersOnline);

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user just logged in'));

	socket.on('sendMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback ('this is coming from the server');
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	timestamp: new Date().getTime()
		// });
	});

	socket.on('disconnect', (socket) =>{
		usersOnline--;
		console.log('client disconnnected');
	})
});

server.listen(port, () => {
  console.log(`Server is up on the amazing port ${port}`);
});