import React, { Component } from 'react';



class App extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    //bind
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="container">
        <form>
          <input type="text" name="title" placeholder="Title" onChange={this.onInputChange} ref="title" />
          <input type="text" name="body" placeholder="Body" onChange={this.onInputChange} ref="body" />
          <button> Post </button>
        </form>
      </div>
    );
  }
}

export default App;
