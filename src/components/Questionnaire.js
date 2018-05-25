import React, {Component} from 'react';
import {connect} from 'react-redux';
import QuestionStepper from '../components/QuestionStepper';
import Snackbar from '@material-ui/core/Snackbar';
import CheckmarkIcon from '@material-ui/icons/Check'

import {config} from '../config/config.js';
import {toggleSnackbar} from "../actions";

class Questionnaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions,
            isSaved: false,
        };

        this.saveTimeout = undefined;
    }

    render() {
        return (
            <div className='Paperbox'>
                <QuestionStepper onSubmit={ this.handleSubmit }
                                 onChange={ this.handleChange }
                                 questions={ this.state.questions }
                                 isReadOnly={ this.props.isReadOnly }
                                 surveyId = { this.props.id }
                                 history={ this.props.history }
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={ this.state.showAlertBox }
                    autoHideDuration={ 1500 }
                    onClose={ () => this.setState({showAlertBox: false}) }
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p>Survey saved</p>
                            <CheckmarkIcon style={{ color: "#00af00", marginLeft: 180 }}/>
                        </div> }/>
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.props.isReadOnly) {
            this.saveForm();
        }
    };

    handleChange = (name, value, additionalOnClickFunc=()=>{}) => {
        window.clearTimeout(this.saveTimeout);
        const oldQuestions = this.state.questions;
        const updatedQuestions = oldQuestions.map(question => {
            const newValue = question.shortText === name ? value : question.value;
            return {...question, value: newValue};
        });
        this.setState({ questions: updatedQuestions });
        this.saveTimeout = window.setTimeout(() => this.saveForm(), 500);
        additionalOnClickFunc();
    };

    saveForm = () => {
        const surveyEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/survey`;
        const questionsAsArray = this.getQuestionValuesAsArray();
        const httpMethod = this.state.isSaved ? 'PATCH' : 'POST';

        this.createNewSurveyRecord(surveyEndpoint, httpMethod).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.error);
            }
        }).then(() => this.createNewSurveyResultRecord(httpMethod, questionsAsArray)
        ).then(() => {
            this.setState({isSaved: true, showAlertBox: true});
        }).catch(err => {
            console.log('error!');
            console.log(err);
        });
    };

    createNewSurveyRecord = (surveyEndpoint, httpMethod) => {
        const projectName = this.props.projectName;

        return fetch(surveyEndpoint, {
            method: httpMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-DreamFactory-Api-Key': config.dreamfactoryApi.apiKey
            },
            body: JSON.stringify({
                'resource': {
                    'survey_id': this.props.id,
                    'project_name': projectName,
                    'created_at': ''
                }
            })
        });
    };

    createNewSurveyResultRecord = (httpMethod, questionsAsArray) => {
        const surveyResultEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/survey_result`;

        return fetch(`${surveyResultEndpoint}?id_field=survey_id%2C%20question_id`, {
            method: httpMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-DreamFactory-Api-Key': config.dreamfactoryApi.apiKey
            },
            body: JSON.stringify({
                'resource': questionsAsArray,
            }),
        })
    };

    getQuestionValuesAsArray = () => {
        return this.state.questions.map((question, index) => {
            return {
                'survey_id': this.props.id,
                'question_id': index + 1,
                'question_answer': question.value,
            };
        });
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        todos: [...state.todos].filter((todo) => todo.surveyId === ownProps.id),
        projectName: state.projectName,
    };
};

export default connect(mapStateToProps)(Questionnaire);
