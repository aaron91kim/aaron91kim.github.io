const http = require( 'http' );
const express = require( 'express' );
const app = express();
const webpack = require( 'webpack' );
const webpackConfig = require( './webpack.config' );
const webpackMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );

var config = require( './webpack.config.js' );
var compiler = webpack( config );

app.use( express.static( 'src' ) );

var server = http.Server( app );
var io = require( 'socket.io' )( server );
server.listen( 3000 );

// below from this line is all about the socket

var sockets = [];
var rooms = [];

function getIndexOfRoom( masterId ){
	var index;
	for( var i =0; i < rooms.length; i++ ){
		if( rooms[i].master.id === masterId ){
			return index = i;
		}
	}
	return index;
}

function getIndexOfUser( userId ){
	var index;
	for( var i= 0; i < sockets.length; i++ ){
		if( sockets[i].id === userId ){
			return index = i;
		}
	}
	return index;
}

io.of( '/main' ).on( 'connection', function ( socket ) {
	var user = {};
	var usersRoom = null;
	//when the user connected to chating room
	socket.on( 'USER_CONNECT', function( data ) {
		//new socket has user information.
		data.id = socket.id;
		user = data;
		sockets.push( user );
		var datas = {
			me: false,
			user: user,
			users: sockets,
			rooms: rooms
		};

		//broadcast people in the room
		socket.broadcast.emit( 'USER_CONNECTED', datas );

		//emit the event to user with me =true
		datas.me = true;
		socket.emit( 'USER_CONNECTED', datas );

		//notifying users someone joined the chatting room.
		var message = user.firstName + 
			' ' + user.lastName +
			' entered the chatting room.';
		socket.emit( 'MESSAGE_SENT', { message: message, 'type': 'system', 'eventType': 'enter' } )
		socket.broadcast.emit( 'MESSAGE_SENT', { message: message, 'type':'system', 'eventType': 'enter' } )
	} );

	socket.on( 'SEND_MESSAGE',function( data ) {
		data.type = 'message';
		socket.emit( 'MESSAGE_SENT',data );
		socket.broadcast.emit( 'MESSAGE_SENT',data );
	} );

	socket.on( 'CREATE_ROOM', function( roomData ) {
		usersRoom = roomData;
		rooms.push( roomData );
		socket.broadcast.emit( 'ROOM_CREATED', roomData );
	} );

	// room master need to connect to the reciever
	socket.on( 'NEED_MASTER_CONNECT_TO_RECEIVER', function( data ){
		socket.broadcast.to( data.master ).emit( 'CONNECT_RECEIVER', data.peer )
	} );

	socket.on( 'disconnect', function () { 
		var roomIndex;
		var socketIndex = getIndexOfUser( user.id );
		sockets.splice( socketIndex, 1 );
		socket.broadcast.emit( 'USER_DISCONNECTED', user );

		if( usersRoom ){
			roomIndex = getIndexOfRoom( usersRoom.master.id );
			rooms.splice( roomIndex,1 );
			socket.broadcast.emit( 'ROOM_REMOVED', usersRoom );
		}
		//notifying users someone left the chatting room.
		var message = user.firstName + ' ' + user.lastName + ' left the chatting room.';
		socket.emit( 'MESSAGE_SENT', { message: message, 'type':'system','eventType': 'leave' } )
		socket.broadcast.emit( 'MESSAGE_SENT', { message: message, 'type':'system', 'eventType': 'leave' } );

	} );

} );


