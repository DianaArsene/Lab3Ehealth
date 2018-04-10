import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
class Home extends Component {
  render() {
    return (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
  }
}

export default Home;