export const LOGIN = 'LOGIN';

export const SET_PROJECT = {
    type: 'SET_PROJECT',
    projectName,
};

export function setProject(projectName) {
    return {
        type: LOGIN,
        projectName,
    }
}