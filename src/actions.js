export const LOGIN = 'LOGIN';

export const SET_PROJECT = 'SET_PROJECT';

export const setProject = (projectName) => {
    return {
        type: SET_PROJECT,
        projectName,
    };
}