import { combineReducers } from 'redux';
import UserReducer from './reducer-users';
import ChattingReducer from './reducer-chatting';
import RoomReducer from './reducer-rooms';
import RoomInfoReducer from './reducer-room-info';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

var defaultState = {
	id: null,
	firstName: null,
	lastName: null,
	online: false,
	inRoom: false
}


function local( state = defaultState, action ) {
	
	switch( action.type ) {

		case "USER_UPDATE_LOCAL":
			return Object.assign( {}, state, action.payload );
		break;

		case "USER_ENTER": 
			var newState = {
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				online: true
			}
			return Object.assign( {}, state, newState );
		break;
		
		case "USER_ENTER_ROOM":
			return Object.assign( {}, state, { inRoom: true } );
		break;
	}

	return state;
}





const allReducers = combineReducers( {
    users: UserReducer,
    messages: ChattingReducer,
    local: local,
    rooms: RoomReducer,
    roomInfo: RoomInfoReducer
} );

export default allReducers
