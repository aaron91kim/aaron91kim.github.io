
export default function messages( state = [], action ) {

	switch( action.type ) {

		case 'USER_MESSAGE_SENT':
			return state.concat( action.payload );
		break;
	}

	return state
}

