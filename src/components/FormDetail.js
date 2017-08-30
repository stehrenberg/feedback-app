import React from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import Questionnaire from './Questionnaire';
import LogoHeader from './LogoHeader';
import questions from '../config/questionTexts.json';

const FormDetail = ({ match, history }) => {
    const formId = match.params.formId;
    const meetingDate = Moment(formId.toString(), 'YYYYMMDD').format("dddd, MMMM Do YYYY");

    return (
        <div className="FeedbackForm">
            <LogoHeader title={ `Feedback Meeting on ${ meetingDate }` } />
            <div className="App-content">
                <Questionnaire id={ formId } questions={ questions.questionTexts } isReadOnly={ true } />
                <div className="App-footer">
                    <RaisedButton className="nav-btn" label="Back" onClick={ history.goBack } />
                </div>
            </div>
        </div>
    );
};

FormDetail.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default FormDetail;
