export const SET_PROJECT = 'SET_PROJECT';
export const LOGIN = 'LOGIN';
export const ADD_TODO = 'ADD_TODO';

export const setProject = (projectName) => {
    return {
        type: SET_PROJECT,
        projectName,
    };
};

export const setJWT = (jwt) => {
    return {
        type: LOGIN,
        jwt,
    };
};

export const addTodo = (newTodo) => {
    return {
        type: ADD_TODO,
        newTodo,
    }
};