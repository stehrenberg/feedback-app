import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export const config = {
    dreamfactoryApi : {
        apiBaseUrl: env.REACT_APP_DF_API_BASEURL,
        loginEndpoint: env.REACT_APP_DF_LOGIN_ENDPOINT,
        apiKey: env.REACT_APP_DF_APIKEY,
    },
};