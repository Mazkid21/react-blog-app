import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import ReactQuill from 'react-quill';
import {editPost} from '../actions/postsAction';

 
 
class NoteEdit extends Component {

	constructor(props) { 
		super(props);
		this.state = {
			title: this.props.post.title,
			body: this.props.post.body

		};
		//bind
		this.onInputChange = this.onInputChange.bind(this)
		this.onHandleChange = this.onHandleChange.bind(this)
		this.OnHandleSubmit = this.OnHandleSubmit.bind(this)

	}

	onInputChange(e) {
		this.setState({ title: e.target.value})
	}

	onHandleChange(e) {
		this.setState({
			body: e
		});
		console.log(this.state.body)
	}

	OnHandleSubmit(e) {
		e.preventDefault();
		const post = {
			title: this.state.title,
			body: this.state.body,
			uid: this.props.uid
		};
		this.props.editPost(this.props.match.params.id, post);
		this.setState({
			title: '', 
			body: ''
		});
		this.props.history.push('/');
	}



	render() {
		return (
			<div className="container">
				<form onSubmit={this.OnHandleSubmit}>
					<div className="form-group">
						<input 
							value={this.state.title}
							type="text" 
							name="title" 
							placeholder="Title" 
							onChange={this.onInputChange} 
							ref="title" 
							className="form-control" 
						/>
					</div>
					<div className="form-group">
						<ReactQuill 
							modules={NoteEdit.modules}
							formats={NoteEdit.formats}
							value={this.state.body}
							placeholder="Body" 
							onChange={this.onHandleChange} 
						/>
					</div>
					<button className="btn btn-primary"> UPDATE </button>
				</form>
			</div>
		);
	}
}

NoteEdit.modules = {
	toolbar : [
		[{ header : '1'}, {header: '2'}, {font: [] }],
		[{size: []}],
		['bold', 'italic', 'undeline', 'strike', 'blockquote'],
		[{'list': 'ordered'}, {'list': 'bullet'}],
		['link', 'image', 'video'],
		['clean'],
		['code-block']

	]
};

NoteEdit.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic', 
	'undeline', 
	'strike', 
	'blockquote', 
	'list', 
	'bullet', 
	'link', 
	'image', 
	'video', 
	'code-block'
]


function mapStateToProps(state, ownProps){
	return {
		post: state.posts[ownProps.match.params.id], 
		uid: state.user.uid
	};
}
 
 
export default connect(mapStateToProps, {editPost})(NoteEdit);