import React, {Component} from 'react';
import Moment from 'moment';

import logo from './mayflower_logo.png';
import './App.css';
import Questionnaire from './compontents/Questionnaire';
import questions from './questionTexts.json';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={ logo } className="App-logo" alt="logo"/>
                    <h2>Cooperation Feedback Questionnaire</h2>
                </div>
                <div className="App-content">
                    <Questionnaire id={ this.generateId() } questions={ questions.questionTexts } />
                </div>
            </div>
        );
    }

    generateId() {
        return Moment().format("YYYYMMDD");
    }
}

export default App;
