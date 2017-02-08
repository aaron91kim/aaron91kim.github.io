const defaultState = {
	master: null,
	title: null,
	masterPeer: null,
}

export default function ( state = defaultState, action ) {

	switch( action.type ) {
		case 'READY_TO_CREATE_ROOM':
			return Object.assign( {}, state, action.payload );
		break;

		case 'SET_MASTER_PEER':
			return Object.assign( {}, state, action.payload );
		break;

		case 'USER_ENTER_ROOM':
			return Object.assign( {}, state, action.payload );
		break;
	}

	return state
}