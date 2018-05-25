import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export const config = {
    dreamfactoryApi : {
        apiBaseUrl: env.REACT_APP_DF_API_BASEURL,
        loginEndpoint: env.REACT_APP_DF_LOGIN_ENDPOINT,
        apiKey: env.REACT_APP_DF_APIKEY,
    },
    ranks: ["rookie", "supporter", "regular", "heavy", "supreme"],
    rank: {
        rookie: {
            kudos: 5,
            color: '#ffffff',
        },
        supporter: {
            kudos: 13,
            color: '#00bcd4'
        },
        regular: {
            kudos: 23,
            color: '#d88c40',
        },
        heavy: {
            kudos: 42,
            color: '#dddddd',
        },
        supreme: {
            kudos: 89,
            color: '#d3b536'
        }
    },
    kudosPoints: {
        survey: 10,
        todo: 10,
        completeTodo: 10,
    },
};