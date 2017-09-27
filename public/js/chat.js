var socket = io();

function scrollToBottom() {
	// selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child')

	//heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}

};

socket.on('connect', function() {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function (err){
		if(err){
			alert(err);
			window.location.href='/';
		} else {
			console.log('no error, wohooooo!');
		}
	});
	// console.log("Connected to server");
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
	scrollToBottom();
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