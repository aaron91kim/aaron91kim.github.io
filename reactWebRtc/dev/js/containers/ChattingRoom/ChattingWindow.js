import React, { Component } from 'react';
import { socket } from '../../socket';


class ChattingWindow extends Component {

	sendMessage( e ) {
		e.preventDefault();
		var data = Object.assign( {}, this.props.local, { message: this.message.value, time: new Date() } );
		socket.emit( 'SEND_MESSAGE', data );
		this.message.value = '';
	}

	componentDidMount() {
		const _this = this;
		socket.on('MESSAGE_SENT', function( data ) {
			_this.props.sendMessage( data );
		} );
	}

	render() {
		const chattingInputStyle = {
			marginTop : '1em'
		}
		return(
			<div>
				<MessageBox messages={ this.props.messages } />
				<form className="row" onSubmit={ this.sendMessage.bind( this ) } style={ chattingInputStyle }>
					<div className="col-xs-10">
						<input type="text" className="form-control" ref={ ( input )=> this.message = input } />
					</div>
					<div className="col-xs-2">
						<input type="submit" value="Send" className="btn btn-default" />
					</div>
				</form>


			</div>
		)
	}
}


class MessageBox extends Component {

	render() {
		const windowStyle = {
			'height' : '200px',
			'overFlow' : 'scroll',
			'border' : '1px solid #ccc',
			'marginTop' : '1.5em'
		};
		var messages = this.props.messages.map( ( messageObj, i ) => {
			return ( <Message message={ messageObj } key={ i } /> );
		} );
		return (
			<div style={ windowStyle }>
				{ messages }
			</div>
		)
	}
}

class Message extends Component {
	constructor( props ) {
		super( props );
	}
	userMessage( message ) {
		return (
			<div>
				<b>{ this.props.message.firstName + ' ' + this.props.message.lastName + ' : ' }</b>
				<span>{ this.props.message.message }</span>
			</div>
		)
	}
	systemMessage( message ) {
		var messageStyle;
		const userLeave = {
			'color': "#FF3300"
		}
		const userEntered = {
			'color': '#1B8EFF'
		}
		if( message.eventType == 'enter' ) {
			messageStyle = userEntered;
		}
		else if( message.eventType == 'leave' ){
			messageStyle = userLeave;
		}
		return (
			<div style={ messageStyle }>
				{ message.message }
			</div>
		)
	}

	render() {
		var message;
		if( this.props.message.type == 'system' ){
			message = this.systemMessage( this.props.message );
		}
		else {
			message = this.userMessage( this.props.message );
		}

		return(
			<div>
				{ message }
			</div>
		)
	}
}

export default ChattingWindow;