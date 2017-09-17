export const SET_PROJECT = 'SET_PROJECT';
export const LOGIN = 'LOGIN';

export const setProject = (projectName) => {
    return {
        type: SET_PROJECT,
        projectName,
    };
}

export const setJWT = (jwt) => {
    console.log("setJWT called!");
    return {
        type: LOGIN,
        jwt
    };
}