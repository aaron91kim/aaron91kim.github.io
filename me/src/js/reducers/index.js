import { combineReducers } from 'redux'

import scrollReducer from './scrollReducer'
import sectionReducer from './sectionReducer'

export default combineReducers( {
	sections: sectionReducer,
	scroll: scrollReducer
} )