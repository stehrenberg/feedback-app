import React, {Component} from 'react';
import SurveyForm from '../components/SurveyForm';
import { connect } from 'react-redux';

import { apiCall, normalizeProjectName } from '../util/utils';
import { config } from '../config/config.js';

class Questionnaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions,
            isSaved: false,
        };
    }

    // TODO Remove following redundant logic when rebuild using Redux!
    componentWillMount() {
        if (this.props.isReadOnly) {
            this.fetchFormData().then((formsDataAsArray) => {
                const updatedQuestions = this.state.questions.map(question => {
                    const storedQuestion = formsDataAsArray.find(storedQuestion => storedQuestion.id === question.id);
                    const questionValue = !(!storedQuestion) ? storedQuestion.questionValue : "";

                    return  Object.assign({}, {...question}, {value: questionValue});
                });

                this.setState({questions: updatedQuestions});
            });
        }
    }

    render() {
        return (
            <div className="Questionnaire">
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
            </div>
        );
    }

    fetchFormData = () => {
        const projectName = normalizeProjectName(this.props.projectName);
        const surveyResultsEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/survey_result_${projectName}?filter=survey_id%3D'${ this.props.id }'`;
        const errorHandler = (error) => console.log(error);
        const transformationFunc = (data) => data.resource.map((resultTuple) => {
            return {
                // ID is stored as int in db but we need it as string for further comparisons.
                id: resultTuple.question_id.toString(),
                questionValue: resultTuple.question_answer,
            };
        });

        return apiCall(surveyResultsEndpoint, 'GET', transformationFunc, errorHandler, {});
    };

    // TODO Remove all the above :D

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.props.isReadOnly) {
            this.saveForm();
        }
    };

    handleChange = (name, value) => {
        const oldQuestions = this.state.questions;
        const updatedQuestions = oldQuestions.map(question => {
            const newValue = question.shortText === name? value : question.value;
            return Object.assign({}, {...question}, {value: newValue});
        });

        this.setState({ questions: updatedQuestions });
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
            if(this.props.todos.length > 0) {
                this.saveTodos(this.props.todos);
            }}).then(() => {
             this.setState({isSaved: true});
        }).catch(err => {
            console.log("error!");
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
                "resource": {
                    "survey_id": this.props.id,
                    "project_name": projectName,
                    "created_at": ""
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
                "resource": questionsAsArray,
            }),
        })
    };

    saveTodos = (todosAsArray) => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos`;
        const httpMethod = 'POST';
        const dataTransformMethod = () => {};
        const errorHandler = (error) => console.log(error);
        const todosToSave = todosAsArray.map(todo => ({
            survey_id: this.props.id,
            text: todo.text,
            completed: todo.completed
        }));
        const payload = {
            "resource": todosToSave
        };

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
    };

    getQuestionValuesAsArray = () => {
        return this.state.questions.map((question, index) => {
            return {
                "survey_id": this.props.id,
                "question_id": index + 1,
                "question_answer": question.value,
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
