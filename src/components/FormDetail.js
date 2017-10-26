import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import Questionnaire from './Questionnaire';
import LogoHeader from './LogoHeader';
import questions from '../config/questionTexts.json';

const getQuestions = (surveyData) => {
    return questions.questionTexts.map(question => {
        const storedQuestion = surveyData.find(storedQuestion => storedQuestion.questionId.toString() === question.id);
        const questionValue = !(!storedQuestion) ? storedQuestion.questionValue : "";

        return Object.assign({}, { ...question }, { value: questionValue });
    });
};

const FormDetail = ({ match, history, surveys }) => {
    const formId = match.params.formId;
    const meetingDate = Moment(formId.toString(), 'YYYYMMDD').format("dddd, MMMM Do YYYY");
    const survey = surveys.find(survey => survey.surveyId === formId);
    const storedQuestions = getQuestions(survey.data);

    return (
        <div className="FeedbackForm">
            <LogoHeader title={ `Feedback Meeting on ${ meetingDate }` } />
            <div className="App-content">
                <Questionnaire id={ formId } questions={ storedQuestions } isReadOnly={ true } />
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

const mapStateToProps = state => {
    return {
        surveys: state.surveys,
    };
};

export default connect(mapStateToProps)(FormDetail);
