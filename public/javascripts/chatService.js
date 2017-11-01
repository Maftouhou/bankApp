/**
 * Establish Connexion
 */
var socket = io.connect('http://localhost:4000');

var contents    = document.getElementById('contents'),
    user	= document.getElementById('user'),
    sendMessage	= document.getElementById('sendMessage'),
    viewPort	= document.getElementById('viewPort'),
    feedback	= document.getElementById('feedback');

/**
 * Sending message to the socket server
 */
sendMessage.addEventListener('click', function(){
    socket.emit('messaging', {
        contents: contents.value,
        user: user.value
    });
});

/**
 * Send a typing notification to the server
 */
contents.addEventListener('keypress', function(){
    socket.emit('typing', user.value);
});

/**
 * Listening message from the soocket server
 * @param {object} data 
 */
socket.on('messaging', function(data){

    viewPort.innerHTML += '<p><b>'+data.user+'</b> : '+data.contents+'</p>';
    contents.value = '';
    feedback.innerHTML = '';
});

/**
 * Listening typing event from the socket server
 * @param {object} data 
 */
socket.on('typing', function(data){
    feedback.innerHTML = '<p><i><b>'+data+'</b> is typing... </i></p>';
});