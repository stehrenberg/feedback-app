import React, {Component} from 'react';
import SurveyForm from '../components/SurveyForm';
import { connect } from 'react-redux';
import SnackBar from 'material-ui/Snackbar';

import { config } from '../config/config.js';

class Questionnaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions,
            isSaved: false,
            showAlertBox: false,
        };

        this.saveTimeout = undefined;
    }

    render() {
        return (
            <div className='Paperbox'>
                <p>
                    <strong>We would like to improve the quality of the services we supply continuously. We need our
                        customers' help to achieve this, to help us align to his targets give us ideas of what
                        competences to build and where to improve.</strong>
                </p>
                <SurveyForm
                    surveyId={ this.props.id }
                    questions={ this.state.questions }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    isReadOnly={ this.props.isReadOnly }
                />
                <SnackBar
                    className={ 'save-feedback' }
                    open={ this.state.showAlertBox }
                    autoHideDuration={ 1000 }
                    message={ 'Survey saved.' }
                    onRequestClose={ () => this.setState({ showAlertBox: false }) }
                />
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.props.isReadOnly) {
            this.saveForm();
        }
    };

    handleChange = (name, value) => {
        window.clearTimeout(this.saveTimeout);
        const oldQuestions = this.state.questions;
        const updatedQuestions = oldQuestions.map(question => {
            const newValue = question.shortText === name? value : question.value;
            return Object.assign({}, {...question}, {value: newValue});
        });

        this.setState({ questions: updatedQuestions });
        this.saveTimeout = window.setTimeout(() => this.saveForm(), 500);
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
