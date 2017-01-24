import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSection } from '../../actions/scrollAction'

class Section extends Component {

	constructor( props ) {
		super(props);
	}

	componentDidMount() {
		let tempDOM = ReactDOM.findDOMNode(this);
		
		let { offsetTop, offsetHeight } = ReactDOM.findDOMNode( this );
		console.log(offsetTop, this.props.name);
  	this.props.createSection( this.props.name, offsetTop - 115, offsetHeight + offsetTop );
	}

	render(){
		return(
			<div className="section">
				{ this.props.children }
			</div>
		)
	}
}


Section.proptypes = {
	name : React.PropTypes.string.isRequired
}

function mapStateToProps( state ) {
	return state
}

function mapDispatchToProps( dispatch ) {

	return bindActionCreators( {
		createSection
	}, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( Section );