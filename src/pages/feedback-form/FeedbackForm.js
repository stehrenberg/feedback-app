import React, { Component } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import Questionnaire from '../../components/Questionnaire';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';

import './FeedbackForm.css';

class FeedbackForm extends Component {

    render() {
        return (
            <div className="FeedbackForm">
                <LogoHeader title="Cooperation Feedback Questionnaire" />
                <div className="App-content">
                    <Questionnaire id={ this.generateId() } questions={ questions.questionTexts } isReadOnly={ true } />
                    <div className="App-footer">
                        <Link to="/">
                            <button className="nav-btn">back to menu</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    generateId() {
        return Moment().format("YYYYMMDD");
    }
}

export default FeedbackForm;
