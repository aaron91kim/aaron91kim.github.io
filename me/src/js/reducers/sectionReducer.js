import ACTION_TYPE from '!json!../actionType.json'

function craeteSection( section, offsetTop, offsetBottom){
	return {
		section: section, 
		offsetTop: offsetTop,
		offsetBottom: offsetBottom
	}
}

export default function reducer( state = [], action ){
	
	switch ( action.type ){
		case ACTION_TYPE.CREATE_SECTION:
			var { section, offsetTop, offsetBottom } = action.payload;
			return state.concat( new craeteSection(section, offsetTop, offsetBottom ) ) 
			
		break;
	}

	return state;
}