import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import LogoHeader from '../../components/LogoHeader';
import SurveyDataTable from '../../components/SurveyDataTable';
import AlertBox from '../../components/AlertBox';
import { config } from '../../config/config'
import { apiCall, normalizeProjectName } from '../../util/utils';
import '../../app.css';

class FormHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            showAlertBox: false,
        };
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
        return (
            <div>
                <LogoHeader title={'Past Questionnaires for' }/>
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

    fetchFormData = () => {
        const projectName = normalizeProjectName(this.props.projectName);
        const table = `_table/survey_result_${ projectName }`;
        const surveyResultsEndpoint = `${config.dreamfactoryApi.apiBaseUrl}${ table }`;

        return this.fetchSurveyIdsListForProject(projectName).then((surveyIdList) => {
            const transformationFunc = (data) => this.organizeBySurveyId(data.resource, surveyIdList);
            const errorHandler = (error) => console.log(error);

            return apiCall(surveyResultsEndpoint, 'GET', transformationFunc, errorHandler, {});
        });
    };

    fetchSurveyIdsListForProject(projectName) {
        const table = `_table/survey_${ projectName }`;
        const surveyIdsEndpoint = `${config.dreamfactoryApi.apiBaseUrl}${ table }`;
        const transformationFunc = (data) =>  data.resource.map(resource => resource.survey_id);
        const errorHandler = (error) => console.log(error);

        return apiCall(surveyIdsEndpoint, 'GET', transformationFunc, errorHandler, {});
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

const mapStateToProps = (state) => ({ projectName: state.projectName });

export default connect(mapStateToProps)(FormHistory);