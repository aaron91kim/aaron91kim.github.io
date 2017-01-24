import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Section from './Section'
import Intro from './Intro'
import About from './About'
import Contact from './Contact'
import Portfolio from './Portfolio'
import Skills from './Skills'

import { updateScrollPosition } from '../../actions/scrollAction'

class Contents extends Component {
	
 	constructor(props) {
 		super(props);
 	}

 	componentWillMount() {
 		window.addEventListener('scroll', this.handleScroll.bind(this) );
 	}

 	checkCurrentSection( currentScrollPosition ){
 		let currentSection;
 		this.props.sections.forEach( ( section )=> {
 			if(section.offsetTop <= currentScrollPosition && currentScrollPosition <= section.offsetBottom){
 				currentSection = section.section;
 			}
 		})
 		return currentSection;
 	}

 	handleScroll( event ){
 		// + pagging can be the offsetTop of the content Div
    let currentScrollPosition = event.target.scrollTop + event.target.offsetTop;

    this.props.updateScrollPosition( this.checkCurrentSection( currentScrollPosition ), currentScrollPosition );
 	}

	render(){
		return(
			<div className="contents" onScroll={this.handleScroll.bind(this)} >
				<Section name = "Intro">
					<Intro container={this}/>
				</Section>
				<Section name = "About">
					<About />
				</Section>
				<Section name = "Skills">
					<Skills />
				</Section>
				<Section name = "Portfolio">
					<Portfolio />
				</Section>
				<Section name = "Contact">
					<Contact />
				</Section>
			</div>		
		)
	}
}

function mapStateToProps( state ){
	return Object.assign({}, state);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators( {
		updateScrollPosition
	}, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( Contents )