import React, {Component} from 'react';
import {connect} from 'react-redux';
import {googleLogin, twitterLogin} from '../actions/userAction';


class Login extends  Component {


	componentWillMount(){
		if(this.props.user !== null) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.user !== null) {
			nextProps.history.push('/');
		}
	}

	render(){
		return(
			<div className="container-fluid">
				<div className="row text-center">
					<div className="col-sm-12 jumbotron" style={{marginTop: '-20px'}}>
						<h1> DIARY | {new Date().getFullYear()} </h1>
						<h2><i>Login with your favourite</i></h2>
						<h2><b><i>Social Network</i></b></h2>
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

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	};
}



export default connect(mapStateToProps, {googleLogin, twitterLogin})(Login); 