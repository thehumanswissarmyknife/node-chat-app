var socket = io();

socket.on('connect', function() {
	console.log("Connected to server");
});

socket.on('disconnect', function() {
	console.log("Server disconnected");
});

socket.on('newMessage', function(message) {
	console.log('new message received', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});


socket.on('welcomeMessage', function(message) {
	console.log(message.from + " says:", message.text);
});

socket.on('newUserLoggedIn', function(message) {
	console.log(message.from + " says:", message.text);
});


jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('sendMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});
