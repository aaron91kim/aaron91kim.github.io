import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import scrollTo from '../../../scrollTo'
import {connect} from 'react-redux'

class Intro extends Component {

	handleClick(sectionTo) {
  	let _this = this;
  	this.props.sections.forEach( section =>{
  		if( sectionTo == section.section ){
  			let contentContainer = ReactDOM.findDOMNode( _this.props.container );
  			scrollTo( contentContainer, section.offsetTop );
  		}
  	})
  }

	render() {

		return (
			<div className = "Intro__wrapper">
				<img className="gear gear1" src="src/images/gear.png" />
				<img className="gear gear2" src="src/images/gear.png" />

				<div className = "Intro__info">
					<span className = "name">Seonwoo Kim ( Aaron ) </span>|<span className="position"> Web developer </span>|
				</div>
				<div className = "Intro__comment">
					"I am passionate about coding and apt at problem solving. <br/>
					I specialized in <span className="special"> Node JS </span>|<span className="special"> Angular JS </span>|
					<span className="special"> Javascript </span>|<span className="special"> HTML/CSS </span>|
					<span className="special"> JQuery </span>|<span className="special"> Github </span>|<br/>
					I also have experience with <span className="special"> Java </span>|<span className="special"> React </span>|<span className="special"> PHP </span>|<br/>
					I can handle Database queries with <span className="special"> MongoDB </span>|<span className="special"> SQL </span>|<br/>
					I enjoy expanding my skills and I am eager to learn a lot more. <br/> 
					I am looking forward to being part of your team " <br/>
				</div>

				<div className = "Intro__instant-links">
					<div className = "instant-link" onClick={ this.handleClick.bind(this, 'About') } >
						<img src = "src/images/me.jpg" alt = "About me" className = "img-thumbnail" />
						<p>About Me</p>

					</div>
					<div className = "instant-link" onClick={ this.handleClick.bind(this, 'Portfolio') } >
						<img src = "src/images/portfolio.png" alt = "Portfolio" className = "img-thumbnail" />
						<p>Portfolio</p>

					</div>
					<div className = "instant-link" onClick={ this.handleClick.bind(this, 'Contact') } >
						<img src = "src/images/contact.jpg" className = "img-thumbnail" />
						<p>Contact</p>

					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps)(Intro)
