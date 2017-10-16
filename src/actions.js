export const SET_PROJECT = 'SET_PROJECT';
export const LOGIN = 'LOGIN';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const LOAD_TODOS = 'LOAD_TODOS';
export const SET_TODO_FILTER = 'SET_TODO_FILTER';
export const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';

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

export const deleteTodo = (todoId) => {
    return {
        type: DELETE_TODO,
        todoId,
    }
};

export const loadTodos = (todos) => {
    return {
        type: LOAD_TODOS,
        todos,
    }
};

export const setTodoFilter = (todoFilter) => {
    return {
        type: SET_TODO_FILTER,
        todoFilter,
    }
};

export const toggleTodoStatus = (todoId) => {
    return {
        type: TOGGLE_TODO_STATUS,
        todoId
    };
};