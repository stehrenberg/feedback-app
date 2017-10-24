import Moment from 'moment';
import { config } from '../config/config';

export const apiCall = (apiEndpoint,
                        httpMethod,
                        dataTransformMethod,
                        errorHandler = (error) => console.log(error),
                        payload = {}) => {
    let callConfig = {
        method: httpMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-DreamFactory-Api-Key': config.dreamfactoryApi.apiKey
        }
    };

    if(Object.keys(payload).length > 0) {
        callConfig.body = JSON.stringify(payload);
    }

    return fetch(apiEndpoint, callConfig)
        .then((response) => response.ok ? response.json() : Promise.reject(response))
        .then((data) => dataTransformMethod(data))
        .catch(response => {
            errorHandler(response.error);
            return Promise.reject(response.error);
        });
};

export const capitalize = (someString)  => someString.charAt(0).toUpperCase() + someString.slice(1);

export const momentFromSurveyId = (surveyId) => Moment(surveyId.split('-')[0], "YYYYMMDD");

export const normalizeProjectName = (projectName='') => projectName.toLocaleLowerCase();