import appConfig from '../config/config.json';

export const fetchDataFrom = (apiEndpoint, httpMethod, dataTransformMethod) => {
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
};