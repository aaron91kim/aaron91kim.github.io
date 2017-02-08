import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {socket} from '../../socket';

class MenuBar extends Component {
	constructor( props ){
		super( props );
		this.state = {
			showModal: false,
		}
	}
	showCreateRoomModal() {
		this.setState( {
			showModal: true
		} );
	}

	render() {
		return (
			<div className="text-right">
				<button className="btn btn-default" onClick={ this.showCreateRoomModal.bind( this ) }>Make a Room</button>
				<ModalCreateRoom show={ this.state.showModal } readyToCreateRoom={ this.props.readyToCreateRoom } enterRoom={ this.props.enterRoom } local={ this.props.local } />
			</div>

		)
	}

}

class ModalCreateRoom extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			show: props.show
		};
	}

	componentWillReceiveProps( nextProps ) {
	  this.setState( nextProps );
	}

	render() {
		let close = () => {
			this.setState( { show: false } );
		}

		let createRoom = () => {
			const roomData = {
				master: this.props.local,
				title: this.title.value
			}
			this.props.readyToCreateRoom( roomData );
			this.props.enterRoom();
		}

		return(
			<Modal
        show={ this.state.show }
        onHide={ close }
        container={ this }
        aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<label htmlFor="title">Room name</label>
        	<input type="text" id="title" placeholder="Please type the name of room." className="form-control" ref = { input => this.title = input } />
        </Modal.Body>
        <Modal.Footer>
        	<button className='btn btn-primary' onClick={ createRoom }>Create</button>
        	<button className='btn btn-default' onClick={ close }>Close</button>
        </Modal.Footer>
      </Modal>
		)

	}
}

export default MenuBar;
