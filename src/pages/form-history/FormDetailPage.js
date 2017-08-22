import React, { Component } from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

import Questionnaire from '../../components/Questionnaire';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';

class FeedbackForm extends Component {

    render() {
        const formId = this.props.match.params.formId;
        const meetingDate = Moment(formId.toString(), 'YYYYMMDD').format("dddd, MMMM Do YYYY");

        return (
            <div className="FeedbackForm">
                <LogoHeader title={ `Feedback Meeting on ${ meetingDate }` } />
                <div className="App-content">
                    <Questionnaire id={ formId } questions={ questions.questionTexts } isReadOnly={ true } />
                    <div className="App-footer">
                        <RaisedButton className="nav-btn" label="Back" onClick={ this.props.history.goBack } />
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedbackForm;
