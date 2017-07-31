import React, { Component } from 'react';
import Moment from 'moment';

import Questionnaire from './compontents/Questionnaire';
import LogoHeader from './compontents/LogoHeader';
import questions from './questionTexts.json';

import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <LogoHeader title="Cooperation Feedback Questionnaire" />
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
