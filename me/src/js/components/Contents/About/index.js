import React, { Component } from "react"
import ABOUT_ME from "!json!./about.json"
const PATH = "src/images/"



class Past extends Component {
	constructor(props) {
		super(props);
	}

	hasLink(){
		if(this.props.link){
			return (<a href = {this.props.link} download>Download Resume</a>)
		}
	}
	hasDate(){
		if(this.props.date != null){
			return (
				<span> { this.props.date.from } ~ { this.props.date.to }</span>
			)
		}

	}

	renderDescription(){
		let description = this.props.description.map((line, i)=>{
			return (
				<span key={i}>{line}</span>
			)
		})

		return description;
	}

	render(){
		return(
			<li className = "row About__past">

				<div className = "col-xs-3 image-area">
					<img className = "img-thumbnail" src={ PATH + this.props.image } />
				</div>

				<div className = "col-xs-offset-1 col-xs-8 detail-area">
					<p className = "date"> { this.hasDate(this) } </p>
					<p>
						<span className = "title"> { this.props.title } </span>
						<span className = "location"> { this.props.location} </span>
					</p>
					<p className = "description">
						{ this.renderDescription(this) }
					</p>
						{ this.hasLink( this ) }
				</div>

			</li>
		)
	}
}


export default class About extends Component {
	
	render() {
		let pasts = ABOUT_ME.map( (past, i) => {
			return (<Past key = { i } image = { past.image } date = { past.date } title = { past.title } location = { past.location } description = { past.description } link = { past.link }  />)
		})
		return ( 
			<div>
				<ul className = "About">
					{pasts}
				</ul>
			</div>
		)
	}
}