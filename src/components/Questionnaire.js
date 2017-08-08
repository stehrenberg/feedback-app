import React, {Component} from 'react';
import Question from './Question';
import SaveBtn from '../components/SaveBtn'

import appConfig from '../config/config.json'

class Questionnaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions,
        }

        this.preloadCachedInputValues();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.getQuestionValue = this.getQuestionValue.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.props.isReadOnly) {

            let questionnaires = JSON.parse(localStorage.getItem("questionnaires")) || [];
            let newQuestionnaire = this.props.id;

            if (!questionnaires.includes(newQuestionnaire)) {
                questionnaires.push(newQuestionnaire);
            }

            localStorage.setItem(this.props.id, JSON.stringify(this.state.questions, ["id", "value"]));
            localStorage.setItem("questionnaires", JSON.stringify(questionnaires));

            this.saveForm();
        }
    }

    handleChange(name, value) {

        const questions = this.state.questions;
        const targetQuestion = questions.find((question) => question.id === name);
        targetQuestion.value = value;

        this.setState({ questions: questions });
        localStorage.setItem(this.props.id, JSON.stringify(this.state.questions, ["id", "value"]));
    }

    render() {
        return (
            <div className="Questionnaire">
                <h2>Goals</h2>
                <p>
                    <strong>We would like to improve the quality of the services we supply continuously. We need our customers' help to achieve this, to help us align to his targets give us ideas of what competences to build and where to improve.</strong>
                </p>
                <form action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                    {
                        this.state.questions.map(
                            question => <Question key={ question.id }
                                                  name={ question.id }
                                                  label={ question.text }
                                                  value={ question.value }
                                                  onChange={ this.handleChange }
                                                  isReadOnly={ this.props.isReadOnly }
                                {...question} />)
                    }
                    { this.props.isReadOnly ? null : <div className="save-btn"><SaveBtn /></div> }
                </form>
            </div>
        );
    }

    preloadCachedInputValues() {
        const storedQuestions = JSON.parse(localStorage.getItem(this.props.id));
        if (storedQuestions !== null) {
            this.state.questions.forEach(question => {
                const storedQuestion = storedQuestions.find(storedQuestion => storedQuestion.id === question.id);
                question.value = storedQuestion.value;
            });
        }
    }

    saveForm() {
        const surveyEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}_table/survey`;
        const surveyResultEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}_table/survey_result`;
        const answerValue = this.getQuestionValue("understanding");
        let newSurveyId;

        // create new survey record with survey_id
        fetch(surveyEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-DreamFactory-Api-Key' : appConfig.dreamfactoryApi.apiKey
            },
            body: JSON.stringify({
                "resource": {
                    "customer_id" : "",
                    "created_at" : ""
                }
            })
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }
        }).then(function(data) {
            newSurveyId = data.resource[0].survey_id;
            console.log(`Creation of new survey record with Id ${ newSurveyId } was successful.`);

            // create new survey_result record, using just-created survey_id
            return fetch(surveyResultEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-DreamFactory-Api-Key' : appConfig.dreamfactoryApi.apiKey
                },
                body: JSON.stringify({
                    "resource": {
                        "survey_id" : newSurveyId,
                        "question_id" : 1,
                        "question_answer": answerValue
                    }
                })
            })
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }
        }).then(function(data) {
            let newSurveyResultId = data.resource[0].survey_result_id;
            console.log(`Creation of new survey result record with Id ${ newSurveyResultId } was successful.`);
        });;
    }

    getQuestionValue(question_id) {
        return this.state.questions.find((question) => question.id === "understanding").value
    }
}

export default Questionnaire;