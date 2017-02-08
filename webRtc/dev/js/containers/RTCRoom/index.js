import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createRoom, setMasterPeer } from '../../actions/index';
import { socket } from '../../socket';
var Peer = require( 'simple-peer' );

class RTCRoom extends Component {
	constructor( props ) {
		super( props );

		var _this = this;
		var isMaster = false;

		if( props.local.id === props.roomInfo.master.id ) { isMaster = true }
		
		navigator.getUserMedia( { video: true, audio: true }, function( stream) {
			var p = new Peer( { initiator: isMaster, trickle: false, stream: stream } )
			if( isMaster ) {
				socket.on( 'CONNECT_RECEIVER', function( peerToString ) {
					p.signal( JSON.parse( peerToString ) );
				} );
				p.on( 'signal', function(data) {
					// update room data.
					if( data.type == "offer" ){
						let masterPeer = JSON.stringify( data );
						let roomData = Object.assign( {}, props.roomInfo, { masterPeer: masterPeer } );
						props.setMasterPeer( { masterPeer: masterPeer } );
						props.createRoom( roomData );
						socket.emit( 'CREATE_ROOM', roomData );
					}

				} );
			}
			else{
				//receiver side event listeners
				p.signal( JSON.parse( props.roomInfo.masterPeer ) );
				p.on( 'signal', function( data ) {
					if( data.type == "answer" ) {
						socket.emit( 'NEED_MASTER_CONNECT_TO_RECEIVER',
							{ master: props.roomInfo.master.id, peer: JSON.stringify( data ) }
						)
					}

				} );

				p.on( 'stream', function( stream ) {
					var video = document.querySelector( 'video' );
			    video.src = window.URL.createObjectURL( stream );
			    video.play();
				} );
				
			}
			p.on( 'close', function (data) {
				p.destroy( data );
			})

		}, function () {})
		
	}
	render() {
		return (
			<div>
				This is RTC room
				<video src="" ref={ video => this.video = video } />
			</div>
		)
	}
}

function mapStateToProps( state ) {
	return {
		local: state.local,
		roomInfo: state.roomInfo
	}
}
function matchDispatchToProps( dispatch ) {
	return bindActionCreators( {
		setMasterPeer: setMasterPeer,
		createRoom: createRoom
	}, dispatch )
}

export default connect( mapStateToProps, matchDispatchToProps )( RTCRoom )