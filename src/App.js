import React, { Component } from 'react';
import logo from './logo.svg';
import Pets from './Pets';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bienvenue dans votre animalerie</h2>
        </div>
        <button>Add pet</button>
        <Pets />
      </div>
    );
  }
}

export default App;
