import React from 'react';
import Moment from 'moment';
import {connect} from 'react-redux';
import Modal from '@material-ui/core/Modal';

import Questionnaire from '../../components/Questionnaire';
import NavBackBtn from '../../components/buttons/NavBackBtn';
import LogoHeader from '../../components/LogoHeader';
import questions from '../../config/questionTexts.json';
import MiniNavBar from '../../components/MiniNavBar';
import CardMessage from '../../components/CardMessage';
import profile from '../../config/profile';

import '../../app.css'

class FeedbackForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModalDialog: this.isFirstSurvey(),
        };
    }

    componentDidMount = () => {
        setTimeout(() => this.setState({showModalDialog: false}), 10000);
    };

    render = () => {
        const {projectName, history, showMiniNavBar, id} = this.props;
        const cardText = "The better your feedback, the more we can improve our work for you.";
        const cardTitle = "Welcome to your first Feedback Questionnaire!";

        return (
            <div className="FeedbackForm">
                <LogoHeader title={ `Feedback Questionnaire for ${ projectName }` }
                            projectSwitchDisabled={ true }
                            history={ history }/>
                <div className="App-content">
                    <MiniNavBar history={ history } show={ showMiniNavBar }/>
                    <CardMessage show={ this.state.showModalDialog } title={ cardTitle } text={ cardText } direction="right"/>
                    <Questionnaire id={ id }
                                   questions={ questions.questionTexts }
                                   todos={ [] }
                                   isReadOnly={ false }/>
                </div>
            </div>
        );
    };

    isFirstSurvey = () => { return profile.surveyCount < 1 };
}

const mapStateToProps = (state, ownProps) => ({
    //TODO Projektnamen fuer Survey-ID normalisieren?
    id: `${ Moment().format("YYYYMMDD") }-${ state.projectName }`,
    projectName: state.projectName,
    showMiniNavBar: state.showMiniNavBar,
});

export default connect(mapStateToProps)(FeedbackForm);
