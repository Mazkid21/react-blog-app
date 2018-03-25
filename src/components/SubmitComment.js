import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveComment} from '../actions/postsAction';


class SubmitComment extends Component{

	constructor(props){
		super(props)
		this.state = {
			commentBody: ''
		};
		//bind 
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		this.setState({
			commentBody: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const comment = {
			commentBody: this.state.commentBody,
			uid: this.props.uid
		};
		this.props.saveComment(this.props.id, comment);
		this.setState({
			commentBody: ''
		});

	}


	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<textarea
							onChange={this.handleChange}
							value={this.state.commentBody}
							type="text"
							name="commentBody"
							className="form-control no-border"
							placeholder="Write Comment..."
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-success">Add Commment </button>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
	return {
		uid: state.user.uid
	};
}



export default connect(mapStateToProps, {saveComment})(SubmitComment)