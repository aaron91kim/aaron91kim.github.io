var chattingRoom = require('socket.io-client')('http://localhost:3000/main');

module.exports = {
	socket : chattingRoom
}