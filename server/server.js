const path = require('path');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');

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

	socket.emit('welcomeMessage', {
			usersOnline: usersOnline,
			from: 'Admin',
			text: 'Hello Friend',
			timestamp: new Date().getTime()
		});

	socket.broadcast.emit('newUserLoggedIn', {
		from: ' Admin',
		text: 'New user logged in',
		usersOnline: usersOnline,
		timestamp: new Date().getTime()
	});

	socket.on('sendMessage', (message) => {
		console.log('new message written', message);

		

		// io.emit('newMessage', {
		// from: message.from,
		// text: message.text,
		// timestamp: timer
		// });

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