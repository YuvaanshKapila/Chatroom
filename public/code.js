const socket = io();
let username;

// Function to set the username
function setUsername() {
    const input = $('#username-input');
    const enteredUsername = input.val().trim();

    if (enteredUsername !== '') {
        username = enteredUsername;
        input.prop('disabled', true);
        $('#username-container button').prop('disabled', true);

        // Emit a message about the user joining the chat
        socket.emit('user joined', username);
    }
}

// Function to send a chat message
function sendMessage() {
    const message = $('#message-input').val();
    if (message.trim() !== '') {
        socket.emit('chat message', { username, message });
        $('#message-input').val('');
    }
    return false;
}

// Event listener for the form submission
$('form').submit(sendMessage);

// Event listener for the user joining the chat
socket.on('user joined', function (user) {
    $('#messages').append($('<li class="join-message">').text(`${user} entered the chat`));
});

// Event listener for receiving chat messages
socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(`${msg.username}: ${msg.message}`));
});
