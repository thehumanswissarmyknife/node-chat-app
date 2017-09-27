var socket = io();

socket.on('connect', function() {
	console.log("Connected to server");
});

socket.on('disconnect', function() {
	console.log("Server disconnected");
});

socket.on('newMessage', function(message) {

	var template = jQuery('#message-template').html();
	var createdAt = moment(message.createdAt).format('h:mm a');
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		time: createdAt
	});

	jQuery('#messages').append(html);
	// console.log('new message received', message);
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// li.text(`${message.from}: ${message.text}, sent at: ${formattedTime}`);

	// jQuery('#messages').append(li);
});



socket.on('welcomeMessage', function(message) {
	console.log(message.from + " says:", message.text);
});

socket.on('newUserLoggedIn', function(message) {
	console.log(message.from + " says:", message.text);
});


jQuery('#message-form').on('submit', function (e) {

	var messageTextBox = jQuery('[name=message]');
	e.preventDefault();
	socket.emit('sendMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('')
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation){
		return alert('Geolocation not supported!');
	}

	locationButton.attr('disabled', 'disabled').text('sending location ...');

	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		// locationButton.text('Send location);
		alert('unable to fetch location');
	})
});