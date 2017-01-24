import React, {Component} from 'react'
import Contents from './Contents'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'

import { updateScrollPosition } from '../actions/scrollAction'
import scrollTo from '../scrollTo'

class Layout extends Component {
	
	constructor( props ) {
    super( props );
  }
  
  handleClick(sectionTo) {
  	let _this = this;
  	this.props.sections.forEach( section =>{
  		if( sectionTo == section.section ){
  			let contentContainer = ReactDOM.findDOMNode( _this.content );
  			scrollTo( contentContainer, section.offsetTop );
  		}
  	})
  }

	render() {
		var _this = this;
		function isCurrentSection( section ){
			if(section == _this.props.scroll.currentSection) {
				return 'current';
			}
		}

		return(

			<div className = "container">
				<header className = "Layout__header" >
					<h1>
						Seonwoo kim (Aaron)
					</h1>
					<ul>
						<li className={ isCurrentSection( 'About' ) } onClick = { this.handleClick.bind(this, 'About' ) } >
							About me
						</li>
						<li className={ isCurrentSection( 'Skills' ) } onClick = { this.handleClick.bind(this, 'Skills' ) } >
							Skills
						</li>
						<li className={ isCurrentSection( 'Portfolio' ) } onClick = { this.handleClick.bind(this, 'Portfolio' ) } >
							Portfolio
						</li>
						<li className={ isCurrentSection( 'Contact' ) } onClick = { this.handleClick.bind(this, 'Contact' ) } >
							Contact me
						</li>
					</ul>
				</header>
				<Contents ref={content => this.content = content}/>
			</div>
		)
	}

}
function mapStateToProps(state) {
	return state
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateScrollPosition
	}, dispatch)
}
export default connect( mapStateToProps, mapDispatchToProps )( Layout )