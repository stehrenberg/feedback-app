import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import LogoHeader from '../../components/LogoHeader';
import appConfig from '../../config/config.json'

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
        this.fetchFormData().then((formDataAsArray) => this.setState({forms: formDataAsArray}));
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
                        form => <li key={ form.id }>
                            <Link to={ `/feedback/${ form.id }` }>
                                <span>ID: { form.id } </span>
                                <span>NPS: { this.findQuestion(form.data, nps_id) } </span>
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
        const surveyResultsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}_table/survey_result?order=survey_id&group=survey_id%2C%20question_id`;
        const formsData = this.fetchSurveyIdsList().then((surveyIdList) => {
            const surveyIdsAsArray = surveyIdList;

            return fetch(surveyResultsEndpoint, {
                method: 'GET',
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
                const formsData = this.organizeBySurveyId(data.resource, surveyIdList);
                return formsData;
            }).catch(err => console.log(err));
        });

        return formsData;
    }

    fetchSurveyIdsList() {
        const surveyIdsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}_table/survey`;

        const transformationFunc = (data) => {
            const surveyIds = data.resource.map(resource => resource.survey_id);
            return surveyIds;
        };

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
            let newEntry = {
                surveyId: surveyId,
                data: rawData.filter((resultTuple) => resultTuple.survey_id === surveyId).map(resultTuple => {
                    return {
                        questionId: resultTuple.question_id,
                        questionValue: resultTuple.question_answer,
                    };
                })
            };
            return newEntry;
        });
    }

    findQuestion(form, questionId) {
        //console.log(form, Array.isArray(form));
        //const question = form.find(data => data.id === questionId);
        return '';//!(!question) ? question.value : '---';
    }

}

export default FormHistory;