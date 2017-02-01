import React, { Component } from "react"
import reactDOM from 'react-dom'
import PORTFOLIO from '!json!./portfolio.json'

const PATH = 'src/images/'
class PortfolioItem extends Component{
	
	hasLink(){
		if(this.props.link){
			return (
				<a href={this.props.link} target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>
			)
		}
	}
	renderLanguages(){
		let languages = this.props.languages.map( ( language, i )=>{
			return (
				<span key = {i} > {language} <i> | </i> </span> 
			)
		} )
		return languages;
	}
	render(){

		return(
			<li className = "row portfolio-item">
				<div className = "col-xs-7">
					<p className = "title"> { this.props.title } <span className = "link">{this.hasLink( this ) }</span> </p>
					<p className = "languages"> { this.renderLanguages( this ) }</p>
					<p className = "description"> { this.props.description } </p>
				</div>
				<div className = "col-xs-offset-1 col-xs-4">
					<img src = { PATH + this.props.image } className="img-responsive img-thumbnail"/>
				</div>
			</li>
		)

	}
}

export default class Portfolio extends Component {
	
	render() {
		let portfolioItems = PORTFOLIO.map( ( item, i )=>{
			return (
				<PortfolioItem key = { i } languages = { item.languages } 
											 image = { item.image } link = { item.link } 
											 title = { item.title } description = { item.description }/>
			)
		} );

		return ( 
			<div className = "Portfolio">
				<ul>
					{ portfolioItems }
				</ul>
			</div>
		)
	}
}