var socket = io();
socket.on('connect', function() {
	console.log("Connected to server");

	socket.emit('sendMessage', {
		from: 'dennis',
		text: "texst message to my peeps"
	});

	});

socket.on('disconnect', function() {
	console.log("Server disconnected");
});

socket.on('newEmail', function(email) {
	console.log('new Email', email);
});

socket.on('newMessage', function(message) {
	console.log('new message received', message);
});

