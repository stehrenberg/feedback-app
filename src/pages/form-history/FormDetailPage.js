import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Questionnaire from '../../components/Questionnaire';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';

class FeedbackForm extends Component {

    render() {
        console.log(this.props.id);

        return (
            <div className="FeedbackForm">
                <LogoHeader title="Data from <date>'s Feedback Meeting" />
                <div className="App-content">
                    <Questionnaire id={ "" } questions={ [] } isReadOnly={ true } />
                    <div className="App-footer">
                        <Link to="/">
                            <button className="nav-btn">back to menu</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedbackForm;
