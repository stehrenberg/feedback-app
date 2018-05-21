import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';

import Questionnaire from '../../components/Questionnaire';
import NavBackBtn from '../../components/buttons/NavBackBtn';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';

import '../../app.css'

const FeedbackForm = (props) => (
    <div className="FeedbackForm">
        <LogoHeader title={ `Feedback Questionnaire for ${ props.projectName }` } projectSwitchDisabled={ true }/>
        <div className="App-content">
            <Questionnaire id={ props.id }
                           questions={ questions.questionTexts }
                           todos={ [] }
                           isReadOnly={ false }/>
            <div className="App-footer">
                <NavBackBtn history={ props.history } />
            </div>
        </div>
    </div>
    );

const mapStateToProps = (state, ownProps) => ({
    //TODO Projektnamen fuer Survey-ID normalisieren?
    id: `${ Moment().format("YYYYMMDD") }-${ state.projectName }`,
    projectName: state.projectName,
});

export default connect(mapStateToProps)(FeedbackForm);
