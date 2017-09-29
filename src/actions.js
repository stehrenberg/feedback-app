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
    console.log("actions->addTodo called with ", newTodo);
    return {
        type: ADD_TODO,
        newTodo,
    }
};