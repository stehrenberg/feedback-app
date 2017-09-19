import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import LogoHeader from '../../components/LogoHeader';
import SurveyDataTable from '../../components/SurveyDataTable';
import appConfig from '../../config/config.json'
import '../../app.css';
import { fetchDataFrom, capitalize } from '../../util/utils';

class FormHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [],
        };
        this.fetchFormData = this.fetchFormData.bind(this);
    }

    componentWillMount() {
        this.fetchFormData().then((formsDataAsArray) => this.setState({forms: formsDataAsArray }));
    }

    render() {
        const projectName = appConfig.appConfig.projectName;
        const headerProjectName = projectName? `for ${ capitalize(projectName) }` : "";

        return (
            <div>
                <LogoHeader title={`Past Questionnaires ${ headerProjectName }` }/>
                <SurveyDataTable formData={ this.state.forms.reverse() } history={ this.props.history }/>
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

            return fetchDataFrom(surveyResultsEndpoint, 'GET', transformationFunc,  {});
        });
    }

    fetchSurveyIdsListForProject(projectName) {
        const table = `_table/survey_${ projectName }`;
        const surveyIdsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}${ table }`;
        const transformationFunc = (data) =>  data.resource.map(resource => resource.survey_id);

        return fetchDataFrom(surveyIdsEndpoint, 'GET', transformationFunc, {});
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
}

export default FormHistory;