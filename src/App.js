import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Questionnaire from './compontents/Questionnaire'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
          <div className="App">
              <h2>Cooperation Feedback Questionnaire</h2>
              <Questionnaire />
          </div>
      </div>
    );
  }
}

export default App;
