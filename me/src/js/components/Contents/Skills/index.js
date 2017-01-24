import React, { Component } from "react"
import SKILLS from '!json!./skills'
const PATH = "src/images/"

class Skill extends Component {

	render(){
		let imageSrc = PATH + this.props.image;
		return(
			<div className="skill">
				<img src={ imageSrc } className={this.props.side} />
				<span>{ this.props.name }</span>
			</div>
		)
	}

}

export default class Skills extends Component {
	componentWillMount() {
		
	}

	constructor(props) {
		super(props);
	}
	
	/**
	 * Decide the side of image
	 * @param  {Number} i index number of key
	 * @return {String}   left or right
	 */
	
	getSide(i){
		let side = ( i % 2 ) == 0 ? 'left' : 'right'
		return side;
	}

	render() {
		const _this = this;
		
		let skills = SKILLS.map( (skill, i) => {
			return ( <Skill image = { skill.image } name = { skill.name } key = { i } side = { _this.getSide(i) }/> )
		});

		return ( 
			<div className="Skills">
				{skills}
			</div>
		)
	}
}