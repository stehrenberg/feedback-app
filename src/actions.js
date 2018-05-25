export const SET_PROJECT = 'SET_PROJECT';
export const LOAD_PROJECTS = 'LOAD_PROJECTS';
export const LOGIN = 'LOGIN';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const LOAD_TODOS = 'LOAD_TODOS';
export const SET_TODO_FILTER = 'SET_TODO_FILTER';
export const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';
export const LOAD_SURVEYS = 'LOAD_SURVEYS';
export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR';
export const ADD_KUDOS_POINTS = 'ADD_KUDOS_POINTS';
export const SAVE_KUDOS_POINTS = 'SAVE_KUDOS_POINTS';
export const LEVEL_UP = 'LEVEL_UP';
export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR';

export const setProject = (projectName) => {
    return {
        type: SET_PROJECT,
        projectName,
    };
};

export const loadProjects = (projectsList) => {
    return {
        type: LOAD_PROJECTS,
        projectsList
    }
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

export const loadSurveys = (surveys) => {
    return {
        type: LOAD_SURVEYS,
        surveys,
    };
};

export const toggleMiniNavBar = (showMiniNavBar) => {
    return {
        type: TOGGLE_NAVBAR,
        showMiniNavBar,
    }
};

export const addKudosPoints = (kudosPoints) => {
    return {
        type: ADD_KUDOS_POINTS,
        kudosPoints,
    }
};

export const saveKudosPoints = (kudosPoints) => {
    return {
        type: SAVE_KUDOS_POINTS,
        kudosPoints,
    }
};

export const levelUp = (kudosRest) => {
    return {
        type: LEVEL_UP,
        kudosRest
    }
};

export const toggleSnackbar= (message) => {
    return {
        type: TOGGLE_SNACKBAR,
        message
    }
};
