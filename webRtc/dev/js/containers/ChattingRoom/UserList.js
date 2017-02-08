import React, { Component } from 'react';



export default class UserList extends Component {
	
 	render(){
 		const divStyle = {
 			'border':'1px solid #ccc',
 			'paddingTop': '15px',
 			'height': '10em',
			'overflowY': 'scroll'
 		};
 		return (
 			<div>
 				<h5> User List ( { this.props.users.length } )</h5>
	 			<div style={ divStyle }> 
	 				<ul>
	 					{ this.props.users.map( ( user, i ) => { 
	 						return (
	 							<li key={ i }>{ user.firstName + ' '+ user.lastName }</li>
							);
	 						} ); 
	 					}
	 				</ul>
	 			</div>
 			</div>
 		)
 	}
}
