



var _scrollInterval;

function _moveScroll(target, pixel){
	return target.scrollTop += pixel;
}


/**
 * [scrollTo description]
 * @param  {DOM(div)} target       contents that has scroll
 * @param  {number} moveTo       position to move scroll to 
 * @return {[type]}              [description]
 */

export default function scrollTo( target, moveTo){
	clearTimeout( _scrollInterval );
	
	let containerHeight = target.scrollHeight;
	let currentScrollTop = target.scrollTop;
	let amountToMove = currentScrollTop - moveTo;
	let pixelMultiplier = containerHeight / amountToMove;
	let pixelPerLoop =  -(amountToMove / 100);
	
	_scrollInterval = setInterval( () => {
		if( amountToMove > 7 || amountToMove < -7 ){
			amountToMove += pixelPerLoop;
			currentScrollTop = _moveScroll( target, pixelPerLoop );
		}else{
			clearTimeout( _scrollInterval );
		}
	}, 10)

}