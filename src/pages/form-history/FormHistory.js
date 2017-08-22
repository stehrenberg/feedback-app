import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import LogoHeader from '../../components/LogoHeader';
import appConfig from '../../config/config.json'
import '../../app.css';
import config from  '../../config/config.json';


class FormHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [],
        };

        this.findQuestion = this.findQuestion.bind(this);
        this.fetchFormData = this.fetchFormData.bind(this);
    }

    componentWillMount() {
        this.fetchFormData().then((formsDataAsArray) => this.setState({forms: formsDataAsArray}));
    }

    render() {
        const understanding_id = 1;
        const cooperation_id = 2;
        const nps_id = 9;

        return (
            <div>
                <LogoHeader title="Past Questionnaires"/>
                <ul className="forms">{
                    this.state.forms.map(
                        form => <li key={ form.surveyId }>
                            <Link to={ `/feedback/${ form.surveyId }` } >
                                <span>ID: { form.surveyId } </span>
                                <span>NPS: { this.findQuestion(form.data, nps_id) } </span>
                                <span>Cooperation: { this.findQuestion(form.data, cooperation_id) } </span>
                                <span>Understanding: { this.findQuestion(form.data, understanding_id) } </span>
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="App-footer">
                    <RaisedButton className="nav-btn"
                                  primary={ true }
                                  label="Back to Menu"
                                  onClick={ this.props.history.goBack }/>
                </div>
            </div>
        );
    }

    fetchFormData() {
        const projectName = config.appConfig.projectName;
        console.log(projectName);
        const table = '_table/survey_result';
        const filter = !(!projectName)? `&filter=projectName%3D'${ projectName }` : '';
        const params = `order=survey_id&group=survey_id%2C%20question_id`;
        const surveyResultsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}${ table }?${ params }${ filter }`;

        return this.fetchSurveyIdsList().then((surveyIdList) => {
            const transformationFunc = (data) => this.organizeBySurveyId(data.resource, surveyIdList);

            return this.fetchDataFrom(surveyResultsEndpoint, 'GET', transformationFunc);
        });
    }

    fetchSurveyIdsList() {
        const surveyIdsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}_table/survey`;
        const transformationFunc = (data) =>  data.resource.map(resource => resource.survey_id);

        return this.fetchDataFrom(surveyIdsEndpoint, 'GET', transformationFunc);
    }

    fetchDataFrom(apiEndpoint, httpMethod, dataTransformMethod) {
        return fetch(apiEndpoint, {
            method: httpMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-DreamFactory-Api-Key': appConfig.dreamfactoryApi.apiKey
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.error);
            }
        }).then((data) => {
            return dataTransformMethod(data);
        }).catch(err => console.log(err));
    }

    organizeBySurveyId(rawData, surveyIdList) {
        return surveyIdList.map((surveyId) => {
            return {
                surveyId: surveyId,
                data: rawData.filter((resultTuple) => resultTuple.survey_id === surveyId).map(resultTuple => {
                    return {
                        questionId: resultTuple.question_id,
                        questionValue: resultTuple.question_answer,
                    };
                })
            };
        });
    }

    findQuestion(formData, questionId) {
        const question = formData.find(data => data.questionId === questionId);
        return !(!question) ? question.questionValue : '---';
    }

}

export default FormHistory;