import React, { Component } from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

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
                    <Questionnaire id={ this.generateId() } questions={ questions.questionTexts } isReadOnly={ false } />
                    <div className="App-footer">
                        <RaisedButton className="nav-btn" label="Back to Menu" onClick={ this.props.history.goBack } />
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
