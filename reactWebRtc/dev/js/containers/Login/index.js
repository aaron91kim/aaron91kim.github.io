import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { enterUser } from '../../actions/index';
import { bindActionCreators } from 'redux';


class Login extends Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.firstName.focus();
  }

  submit( event ) {
    event.preventDefault();
    var name = {
      firstName: this.firstName.value,
      lastName: this.lastName.value
    };
    this.props.enterUser( name );
  }

  render() {
    var divStyle = {
      width: '700px'
    };
    var formStyle = {
      marginTop: '3em',
      padding: '0 18%'
    };
    return (
      <div className= "row">
        <div className = "span12 text-center">
          <h1>WebRTC & Socket.io Chatting room</h1>
          <form className="form-horizontal" onSubmit={ this.submit.bind( this ) } style={ formStyle }>
            <div className="form-group">
              <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="firstName" placeholder="Type Your First Name" ref={ ( input ) => this.firstName = input } />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="lastName" placeholder="Type Your Last Name" ref={ ( input ) => this.lastName = input } />
              </div>
            </div>
            
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary" >Join</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
} 

function matchDispatchToProps( dispatch ) {
    return bindActionCreators( { enterUser: enterUser }, dispatch );
}

export default connect( null, matchDispatchToProps )( Login )