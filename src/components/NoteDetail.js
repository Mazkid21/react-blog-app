import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from './Comment';
 
 
class NoteDetail extends Component {
	
	renderComments(){
		const {post} = this.props;
		return _.map(post.comments, (comment, key) => {
			return <Comment key={key} id={key}>{comment.commentBody}</Comment>
		});
	}


	render() {
		const {post} = this.props;

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<h1>{post.title}</h1>
						<p>{renderHTML(post.body)}</p>
						<SubmitComment id={this.props.match.params.id} />
						{this.renderComments()}
						<br />
						<Link to="/"> &#171; Back</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
	return {
		post: state.posts[ownProps.match.params.id], 
		uid: state.user.uid
	};
}
 
 
export default connect(mapStateToProps)(NoteDetail);