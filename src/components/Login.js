import React, {Component} from 'react';
import {connect} from 'react-redux';
import {googleLogin, twitterLogin} from '../actions/userAction';


class Login extends  Component {
	render(){
		return(
			<div className="container-fluid">
				<div className="row text-center">
					<div className="col-sm-12 jumbotron" style={{marginTop: '-20px'}}>
						<h1>
							Login in with your favourite <b>Social Network</b> 
						</h1>
					</div>

					<div className="col-sm-6">
						<button className=" btn btn-danger btn-lg" onClick={this.props.googleLogin}>
							Login with Goggle 
						</button>
					</div> 
					<br />
					<div className="col-sm-6">
						<button className=" btn btn-success btn-lg" onClick={this.props.twitterLogin}>
							Login with Twitter 
						</button>
					</div> 
				</div>
			</div>
		);
	}
}



export default connect(null, {googleLogin, twitterLogin})(Login); 