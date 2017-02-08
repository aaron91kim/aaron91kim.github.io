import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RoomManager from './RoomManager';
import UserList from './UserList';
import ChattingWindow from './ChattingWindow';

import { updateUsersList, disconnectUser, updateLocalUser, updateRoomsList, sendMessage, readyToCreateRoom, createRoom, removeRoom, enterRoom } from '../../actions/index'

import { socket } from '../../socket';

class ChattingRoom extends Component {

	componentDidMount() {
  	const _this = this;

  	//when new user is connected.
  	socket.on( 'USER_CONNECTED', function( data ) {
  		if( data.me ) {
  			_this.props.updateLocalUser( data.user );
				_this.props.updateRoomsList( data.rooms );
  		}

			_this.props.updateUsersList( data.users );
		} );

		socket.on( 'USER_DISCONNECTED', function( user ) {
    	_this.props.disconnectUser( user );
    } );

  	_this.connectWS();
  }

	connectWS() {
		socket.emit( 'USER_CONNECT', { firstName: this.props.local.firstName, lastName: this.props.local.lastName } );
	}
	
	render() {
		const divStyle = {
			'border': '1px solid #ccc',
			'padding': '15px',
			'margin': '2em 10%'
		};

		return (
			<div style={ divStyle } className="span12">
				<div>
					<h2>hello! { this.props.local.firstName + ' ' + this.props.local.lastName }</h2>
				</div>
				<RoomManager 
					local={ this.props.local }
					enterRoom={ this.props.enterRoom }
					createRoom={ this.props.createRoom }
					removeRoom={ this.props.removeRoom }
					readyToCreateRoom={ this.props.readyToCreateRoom }
					rooms={ this.props.rooms }>
					<UserList users={ this.props.users } />
				</RoomManager>
				<ChattingWindow
					messages={ this.props.messages }
					local={ this.props.local }
					sendMessage={ this.props.sendMessage } />
			</div>
		)
	}

}

function mapStateToProps( state ) {
	return {
		local: state.local,
		rooms: state.rooms,
		users: state.users,
		messages: state.messages
	};
}

function matchDispatchToProps( dispatch ) {
  return bindActionCreators( {
  	updateUsersList: updateUsersList,
  	disconnectUser: disconnectUser,
  	updateLocalUser: updateLocalUser,
  	sendMessage: sendMessage,
  	createRoom: createRoom,
  	enterRoom: enterRoom,
  	readyToCreateRoom: readyToCreateRoom,
  	updateRoomsList: updateRoomsList,
  	removeRoom: removeRoom
  }, dispatch )
}

export default connect( mapStateToProps, matchDispatchToProps )( ChattingRoom );