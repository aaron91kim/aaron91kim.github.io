
function objectIndexInArray( arr, target ) {
    var index;
    arr.forEach( ( obj, i ) => {
        if( obj.id.toString() === target.id.toString() ) {
            return index = i;
        }

    } )

    return index;
}
export default function ( state = [], action ) {

    switch ( action.type ) {
        case 'USER_UPDATE_LIST':
        	return action.payload;
        break;

        case 'USER_DISCONNECTED':
            var i = objectIndexInArray( state, action.payload );
        	return [ ...state.slice( 0, i ), ...state.slice( i + 1 ) ];
        break;
    }
    
    return state;
}
