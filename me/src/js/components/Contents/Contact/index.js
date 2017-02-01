import React, { Component } from "react"


export default class Contact extends Component {

	render() {

		return ( 
			<div className = "Contact">
				
				<p className = "Contact__thanks">Thank you for your interest!
				Please feel free to contact me.
				</p>

				<div className="Contact__information">
					<p> <b>Contact with</b> </p>
					<p> <i class="fa fa-github-square" aria-hidden="true"></i> <a href="https://github.com/aaron91kim/aaron91kim.github.io"> https://github.com/aaron91kim/aaron91kim.github.io </a></p>
					<p> <i class="fa fa-linkedin-square" aria-hidden="true"></i> <a href="https://www.linkedin.com/in/seonwookim" >https://www.linkedin.com/in/seonwookim </a> </p>
					<p> <i class="fa fa-mobile" aria-hidden="true"></i> (250) 899 - 7654 </p>
					<p> <i class="fa fa-envelope" aria-hidden="true"></i> Aaron91kim@gmail.com </p>
				</div>
			</div>
		)
	}
}