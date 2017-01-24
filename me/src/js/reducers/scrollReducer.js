import ACTION_TYPE from '!json!../actionType.json'

const DEFAULT_STATE = {
	currentSection: 'Intro',
	scrollPosition: 0
	
}



export default function reducer( state = DEFAULT_STATE, action ){

	switch ( action.type ){
		case ACTION_TYPE.UPDATE_SCROLL_POSITION:
			return Object.assign( ...state, { currentSection: action.payload.section, scrollPosition: action.payload.scrollPosition } );
		break;
	}

	return state;
}