import React, { Component } from 'react';
import { database } from '../firebase';
import _ from 'lodash';



class App extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: {}
    };
    //bind
    this.onInputChange = this.onInputChange.bind(this)
    this.OnHandleSubmit = this.OnHandleSubmit.bind(this)
  }

  //lifecycle method 
  componentDidMount(){
    database.on('value', snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }

  // render posts from firebase 
  renderPosts(){
    return _.map(this.state.posts, (post, key) => {
      return (
        <div key={key}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
        )
    });
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  OnHandleSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    database.push(post);

    this.setState({
      title: '', 
      body: ''
    });
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
            <input 
              value={this.state.body}
              type="text" 
              name="body" 
              placeholder="Body" 
              onChange={this.onInputChange} 
              ref="body" 
              className="form-control" 
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

export default App;
