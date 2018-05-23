import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import Questionnaire from './Questionnaire';
import LogoHeader from './LogoHeader';
import MiniNavBar from '../components/MiniNavBar';
import questions from '../config/questionTexts.json';

const FormDetail = ({ match, history, surveys, showMiniNavBar }) => {
    const formId = match.params.formId;
    const meetingDate = Moment(formId.toString(), 'YYYYMMDD').format("dddd, MMMM Do YYYY");
    const survey = surveys.find(survey => survey.surveyId === formId);
    const storedQuestions = getQuestions(survey.data);

    return (
        <div className="FeedbackForm">
            <LogoHeader title={ `Feedback Meeting on ${ meetingDate }` }
                        history={ history }
                        projectSwitchDisabled={ true } />
            <div className="App-content">
                <MiniNavBar history={ history } show={ showMiniNavBar }/>
                <Questionnaire id={ formId } questions={ storedQuestions } isReadOnly={ true } />
            </div>
        </div>
    );
};

const getQuestions = (surveyData) => {
    return questions.questionTexts.map(question => {
        const storedQuestion = surveyData.find(storedQuestion => storedQuestion.questionId.toString() === question.id);
        const questionValue = !(!storedQuestion) ? storedQuestion.questionValue : "";

        return Object.assign({}, { ...question }, { value: questionValue });
    });
};

FormDetail.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        surveys: state.surveys,
        showMiniNavBar: state.showMiniNavBar
    };
};

export default connect(mapStateToProps)(FormDetail);
