import React, { Component } from 'react';
import MenuBar from './MenuBar';
import { socket } from '../../socket';

class RoomManager extends Component {

	render() {
		return(
			<div>
				<MenuBar local={ this.props.local } enterRoom={ this.props.enterRoom } readyToCreateRoom={ this.props.readyToCreateRoom } />
				<div className="row">
					<div className= "col-xs-8">
						<RoomList rooms={ this.props.rooms } local={ this.props.local } enterRoom={ this.props.enterRoom } createRoom={ this.props.createRoom } removeRoom={ this.props.removeRoom } />
					</div>
					<div className="col-xs-4">
						{ this.props.children }
					</div>
				</div>
			</div>
		)
	}

}




class RoomList extends Component {
	constructor( props ) {
		super( props );

		socket.on( 'ROOM_CREATED', function( roomData ) {
			props.createRoom(roomData);
		} );
		socket.on( 'ROOM_REMOVED', function( roomData ) {
			props.removeRoom( roomData );
		} );
	}

	render() {
		var connectRoom = ( room ) => {
			console.log( room, 'roomdata' );
			this.props.enterRoom( room );
		};
		var chattingrooms	= this.props.rooms.map( ( room, i ) => {
			return ( <RoomItem room={ room } key={ i } enterRoom={ connectRoom } /> );
		} );
		const roomStyle = {
			'height': '10em',
			'overflowY': 'scroll'
		}
 		return (
 			<div style={ roomStyle }>
 				<h5> Room List ( { this.props.rooms.length } )</h5>
 				<table className="table table-bordered">
 					<thead>
	 					<tr>
	 						<td>Room name</td>
	 						<td>Room master</td>
	 						<td>join</td>
	 					</tr>
 					</thead>
 					<tbody>
 						{ chattingrooms }
 					</tbody>
 				</table>
 			</div>
 		)
 	}
}

class RoomItem extends Component {


	render() {
		function enterRoom() {
			this.props.enterRoom( this.props.room );
		}

		return(
			<tr>
				<td>{ this.props.room.title }</td>
				<td>{ this.props.room.master.firstName + ' ' + this.props.room.master.lastName }</td>
				<td><button className="btn btn-deafult" onClick={ enterRoom.bind( this ) }>Connect</button></td>
			</tr>
		)

	}
}

export default RoomManager;
