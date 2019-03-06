import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: []
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to the Node-Blog</h1>

      </div>
    );
  }
}

export default App;
