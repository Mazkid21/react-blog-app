import React, {Component} from 'react';
import {connect} from 'react-redux';
// with withRouter you can get access to the history obcet's property 
import {withRouter} from 'react-router-dom';
import {getUser} from '../actions/userAction';
import {getPosts} from '../actions/postsAction';

class LoadingComponent extends Component {
	componentWillMount(){
		const {userLoading, postsLoading} = this.props;
		//if we havent tried to load user, load user
		if (userLoading === undefined) {
			this.props.getUser();
		}

		// if we havent tried to get posts, get posts 
		if (postsLoading === undefined) {
			this.props.getPosts();
		}
	}

	componentWillReceiveProps(nextProps){
	// wait for user to get authenticated and try to load posts 
		if (nextProps.postsLoading === -1 && nextProps.user !== null) {
			this.props.getPosts();
		}
	}

	render(){
		const {userLoading, postsLoading, children} = this.props;
		/**
		* throughout the lifetime of our app user and notes loading stats will
		* keep toggling between true and false 
		* when anything other than that toggling stat such as true or false is in the state 
		* tht means the loading operation is settled and not active 
		* that time, show the enclosing components
		* for everthing elses and inbetween show Loading 
		*/
		if ((!userLoading && !postsLoading)  || this.props.user === null) {
			return <div>{children}</div>;
		} else {
			return (
				<div>
					<h2>Loading...</h2>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
    return {
        userLoading: state.loading.user,
        postsLoading: state.loading.posts,
        user: state.user
    };
}

export default withRouter(connect(mapStateToProps, {getUser, getPosts})(LoadingComponent));