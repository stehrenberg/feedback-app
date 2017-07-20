import React, {Component} from 'react';
import Moment from 'moment';

import logo from './logo.svg';
import './App.css';
import Questionnaire from './compontents/Questionnaire';
import questions from './questionTexts';

class App extends Component {

    render() {
        const questionnaire = questions;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={ logo } className="App-logo" alt="logo"/>
                </div>
                <div className="App">
                    <h2>Cooperation Feedback Questionnaire</h2>
                    <Questionnaire id={ this.generateId() } content={ questionnaire } />
                </div>
            </div>
        );
    }

    generateId() {
        return Moment().format("YYYYMMDD");
    }
}

export default App;
