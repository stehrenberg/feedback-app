import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import LogoHeader from '../../components/LogoHeader';
import SurveyDataTable from '../../components/SurveyDataTable';
import appConfig from '../../config/config.json'
import AlertBox from '../../components/AlertBox';
import '../../app.css';
import { fetchDataFrom, capitalize } from '../../util/utils';

class FormHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            showAlertBox: false,
        };
        this.fetchFormData = this.fetchFormData.bind(this);
    }

    componentWillMount() {
        this.fetchFormData().then((formsDataAsArray) => {
            this.setState({
                forms: formsDataAsArray,
                showAlertBox: formsDataAsArray.length === 0,
            });
        }).catch((err) => this.setState({ showAlertBox: true }));
    }

    render() {
        const projectName = appConfig.appConfig.projectName;
        const headerProjectName = projectName? `for ${ capitalize(projectName) }` : "";

        return (
            <div>
                <LogoHeader title={`Past Questionnaires ${ headerProjectName }` }/>
                <SurveyDataTable formData={ this.state.forms.reverse() } history={ this.props.history }/>
                <AlertBox 
                    show={ this.state.showAlertBox }
                    dialogText={ "No completed surveys to show yet." }
                    btnTexts={ ["Noted!"] }
                    handleClose={ () => this.setState({ showAlertBox: false }) }
                />
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
            const errorHandler = (error) => console.log(error);

            return fetchDataFrom(surveyResultsEndpoint, 'GET', transformationFunc, errorHandler, {});
        });
    }

    fetchSurveyIdsListForProject(projectName) {
        const table = `_table/survey_${ projectName }`;
        const surveyIdsEndpoint = `${appConfig.dreamfactoryApi.apiBaseUrl}${ table }`;
        const transformationFunc = (data) =>  data.resource.map(resource => resource.survey_id);
        const errorHandler = (error) => console.log(error);

        return fetchDataFrom(surveyIdsEndpoint, 'GET', transformationFunc, errorHandler, {});
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