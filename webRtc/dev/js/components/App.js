import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Login from '../containers/Login';
import ChattingRoom from '../containers/ChattingRoom';
import RTCRoom from '../containers/RTCRoom';

require( '../../scss/style.scss' );
  
class App extends Component {

  constructor( props ) {
    super( props );
  }
  render() {
  	var userComponent ;
  	if( ! this.props.local.online ) {
  		userComponent = <Login />
  	}
    else if( this.props.local.online && ! this.props.local.inRoom ) {
  		userComponent = <ChattingRoom />
  	}
    else{
      userComponent = <RTCRoom />
    }
  	return (
  		<div>
					{ userComponent }
	    </div>
  	)

  }
}

function mapStateToProps( state ) {
    return Object.assign( {}, { local: state.local } );
}

export default connect( mapStateToProps )( App );
