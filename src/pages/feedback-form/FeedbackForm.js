import React from 'react';
import Moment from 'moment';
import {connect} from 'react-redux';
import Slide from '@material-ui/core/Slide';

import Questionnaire from '../../components/Questionnaire';
import NavBackBtn from '../../components/buttons/NavBackBtn';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';
import MiniNavBar from '../../components/MiniNavBar';

import '../../app.css'

const FeedbackForm = (props) => (
    <div className="FeedbackForm">
        <LogoHeader title={ `Feedback Questionnaire for ${ props.projectName }` }
                    projectSwitchDisabled={ true }
                    history={ props.history }/>
        <div className="App-content">
            <Slide direction="down" in={ props.showMiniNavBar } mountOnEnter unmountOnExit>
                <MiniNavBar history={ props.history }/>
            </Slide>
            <Questionnaire id={ props.id }
                           questions={ questions.questionTexts }
                           todos={ [] }
                           isReadOnly={ false }/>
        </div>
        <div className="App-footer">
            <NavBackBtn history={ props.history }/>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    //TODO Projektnamen fuer Survey-ID normalisieren?
    id: `${ Moment().format("YYYYMMDD") }-${ state.projectName }`,
    projectName: state.projectName,
    showMiniNavBar: state.showMiniNavBar,
});

export default connect(mapStateToProps)(FeedbackForm);
