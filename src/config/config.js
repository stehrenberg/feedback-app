import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export const config = {
    dreamfactoryApi : {
        apiBaseUrl: env.REACT_APP_DF_API_BASEURL,
        loginEndpoint: env.REACT_APP_DF_LOGIN_ENDPOINT,
        apiKey: env.REACT_APP_DF_APIKEY,
    },
    rank: {
        rookie: {
            limit: 0,
            color: '#ffffff',
        },
        supporter: {
            limit: 5,
            color: '#00bcd4'
        },
        regular: {
            limit: 13,
            color: '#d88c40',
        },
        heavy: {
            limit: 30,
            color: '#dddddd',
        },
        supreme: {
            limit: 42,
            color: '#d3b536'
        }
    },
    kudosPoints: {
        survey: 5,
        todo: 2,
        completeTodo: 8,
    },
};