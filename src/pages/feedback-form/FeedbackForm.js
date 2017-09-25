import React from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import Questionnaire from '../../components/Questionnaire';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';

import '../../app.css'

const FeedbackForm = (props) => {

        return (
            <div className="FeedbackForm">
                <LogoHeader title="Cooperation Feedback Questionnaire"/>
                <div className="App-content">
                    <Questionnaire id={ generateId() }
                                   questions={ questions.questionTexts }
                                   todos={ [] }
                                   isReadOnly={ false }/>
                    <div className="App-footer">
                        <RaisedButton className="nav-btn"
                                      onClick={ props.history.goBack }
                                      icon={ <ArrowBack /> }
                                      primary={ true }
                                      label={ "Back" }/>
                    </div>
                </div>
            </div>
        );


};

const generateId = () => Moment().format("YYYYMMDD");

export default FeedbackForm;
