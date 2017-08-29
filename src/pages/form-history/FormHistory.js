import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import LogoHeader from '../../components/LogoHeader';
import appConfig from '../../config/config.json'
import '../../app.css';

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
        this.fetchFormData().then((formsDataAsArray) => this.setState({forms: formsDataAsArray || []}));
    }

    render() {
        const understanding_id = 1;
        const cooperation_id = 2;
        const nps_id = 9;
        const projectName = appConfig.appConfig.projectName;
        const headerProjectName = projectName? `for ${ projectName.capitalize() }` : "";

        return (
            <div>
                <LogoHeader title={`Past Questionnaires ${ headerProjectName }` }/>
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
        const projectName = appConfig.appConfig.projectName;
        const table = `_table/survey_result_${ projectName }`;
        const surveyResultsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}${ table }`;

        return this.fetchSurveyIdsListForProject(projectName).then((surveyIdList) => {
            const transformationFunc = (data) => this.organizeBySurveyId(data.resource, surveyIdList);

            return this.fetchDataFrom(surveyResultsEndpoint, 'GET', transformationFunc);
        });
    }

    fetchSurveyIdsListForProject(projectName) {
        const table = `_table/survey_${ projectName }`;
        const surveyIdsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}${ table }`;
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