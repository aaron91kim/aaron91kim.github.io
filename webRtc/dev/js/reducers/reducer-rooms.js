function objectIndexInArray( arr, target ) {
    var index; 
    arr.forEach( ( obj,i ) => {
        if( obj.master.id.toString() == target.master.id.toString() ) {
            return index = i;
        }

    } )
    return index;
}

export default function( state = [], action ) {

	switch( action.type ) {
		case 'ROOM_UPDATE_LIST':
			return state.concat( action.payload );
		break;

		case 'CREATE_ROOM':
			return state.concat( action.payload );
		break; 

		case 'REMOVE_ROOM':
			var i = objectIndexInArray( state, action.payload );
			return [ ...state.slice( 0, i ), ...state.slice( i + 1 ) ];
		break;
	}

	return state;
}