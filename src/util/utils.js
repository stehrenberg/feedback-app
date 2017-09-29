import appConfig from '../config/config.json';

export const apiCall = (apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload = {}) => {

    let config = {
        method: httpMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-DreamFactory-Api-Key': appConfig.dreamfactoryApi.apiKey
        }
    };

    if(Object.keys(payload).length > 0) {
        config.body = JSON.stringify(payload);
    }

    return fetch(apiEndpoint, config)
        .then((response) => response.ok ? response.json() : Promise.reject(response))
        .then((data) => dataTransformMethod(data))
        .catch(response => {
            errorHandler(response.error);
            return Promise.reject(response.error);
        });
};

export const capitalize = (someString)  => someString.charAt(0).toUpperCase() + someString.slice(1);