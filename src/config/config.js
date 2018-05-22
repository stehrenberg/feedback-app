import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export const config = {
    dreamfactoryApi : {
        apiBaseUrl: env.REACT_APP_DF_API_BASEURL,
        loginEndpoint: env.REACT_APP_DF_LOGIN_ENDPOINT,
        apiKey: env.REACT_APP_DF_APIKEY,
    },
    rankLimits: {
        supporter: 5,
        regular: 13,
        heavy: 30,
        supreme: 42
    },
    kudosPoints: {
        survey: 5,
        todo: 2,
        completeTodo: 8,
    }
};