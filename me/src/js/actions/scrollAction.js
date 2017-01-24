import ACTION_TYPE from '!json!../actionType.json'



/**
 * [changeSection description]
 * @param  {String} section name of section
 * @return {[type]}         [description]
 */
export function updateScrollPosition( section, scrollPosition ) {
	return {
		type: ACTION_TYPE.UPDATE_SCROLL_POSITION,
		payload: {
			section,
			scrollPosition
		}
	}
}

/**
 * [createSection description]
 * @param  {String} section name of section
 * @param  {number} offsetY offsetY position from DOM
 * @return {[type]}         Reducer generate new section in ../reducers/scrollReducer.js
 */
export function createSection( section, offsetTop, offsetBottom ) {
	return {
		type: ACTION_TYPE.CREATE_SECTION,
		payload: {
			section,
			offsetTop,
			offsetBottom
		}
	}
}