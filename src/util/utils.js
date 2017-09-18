import appConfig from '../config/config.json';

export const fetchDataFrom = (apiEndpoint, httpMethod, dataTransformMethod, payload = null) => {

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

    return fetch(apiEndpoint, config).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response.error);
        }
    }).then((data) => {
        return dataTransformMethod(data);
    }).catch(err => console.log(err));
};

export const capitalize = (someString)  => someString.charAt(0).toUpperCase() + someString.slice(1);