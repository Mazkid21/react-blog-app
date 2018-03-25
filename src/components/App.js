import React, { Component } from 'react';
import _ from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import {connect} from 'react-redux';
import {getPosts, savePosts, deletePost} from '../actions/postsAction';
import PostCard from './postCard';
import {getUser} from '../actions/userAction';
import { Link } from 'react-router-dom';



class App extends Component {

	constructor(props) { 
		super(props);
		this.state = {
			title: '',
			body: ''

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
			uid: this.props.user.uid
		};
		this.props.savePosts(post)
		this.setState({
			title: '', 
			body: ''
		});
	}




	// render posts from firebase 
	renderPosts(){
		return _.map(this.props.posts, (post, key) => {
			return (
				<PostCard key={key}>
				<Link to={`/${key}`}>
					<h2>{post.title}</h2>
				</Link>
					<p>{renderHTML(post.body)}</p>
					{post.uid === this.props.user.uid && (
						<div>
							<button className="btn btn-danger btn-xs" onClick={()=> this.props.deletePost(key)} >
								Delete
							</button>
							<button className="btn btn-info btn-xs pull-right">
								<Link to={`/${key}/edit`}> UPDATE </Link> 
							</button>
						</div>
					)}
				</PostCard>
			);
		});
	}



	render() {
		var photoStyle = {
			padding: '20px',
			borderRadius: '50%'
		};


		return (
			<div className="container">
			<div className="col-sm-2 text-center">
				<img 
					src={this.props.user.photoURL}
					height="100px"
					className="img img-rounded-circle"
					style={photoStyle}
					/>
					<h4 className="username">Welcome back {this.props.user.displayName} </h4>
			</div>
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
							modules={App.modules}
							formats={App.formats}
							value={this.state.body}
							placeholder="Body" 
							onChange={this.onHandleChange} 
						/>
					</div>
					<button className="btn btn-primary"> Post </button>
				</form>
				<br/>
				{this.renderPosts()}
			</div>
		);
	}
}

App.modules = {
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

App.formats = [
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

function mapStateToProps(state, props){
	return {
		posts: state.posts,
		user: state.user 
	}
}


export default connect(mapStateToProps, {getPosts, savePosts, deletePost, getUser}) (App);
