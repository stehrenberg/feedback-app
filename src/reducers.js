import { combineReducers } from 'redux';
import './actions';

function projectName(state = '', action) {
    switch(action.type) {
        case 'SET_PROJECT':
            return action.projectName;
        default:
            return state;
    }
}

function projects(state = [], action) {
    switch(action.type) {
        case 'LOAD_PROJECTS':
            return [...action.projectsList];
        default:
            return state;
    }
}

function jwt(state = {}, action) {
    switch(action.type) {
        case 'LOGIN':
            return {...action.jwt};
        default:
            return state;
    }
}

function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.newTodo.id,
                    surveyId: action.newTodo.surveyId,
                    text: action.newTodo.text,
                    completed: action.newTodo.completed,
            }];
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.todoId);
        case 'LOAD_TODOS':
            return [...action.todos];
        case 'TOGGLE_TODO_STATUS':
            return state.map((todo) =>
                (todo.id === action.todoId)
                    ? {...todo, completed: !todo.completed}
                    : todo);
        default:
            return state;
    }
}

function todoFilter(state = 'SHOW_ALL', action) {
    switch(action.type) {
        case 'SET_TODO_FILTER':
            return action.todoFilter;
        default:
            return state;
    }
}

function surveys(state = [], action) {
    switch(action.type) {
        case 'LOAD_SURVEYS':
            return [...action.surveys];
        default:
            return state;
    }
}

function showMiniNavBar(state = false, action) {
    switch(action.type) {
        case 'TOGGLE_NAVBAR':
            return action.showMiniNavBar;
        default:
            return state;
    }
}

function kudosPoints(state = {new: 0, total: 0}, action) {
    switch(action.type) {
        case 'ADD_KUDOS_POINTS':
            return { ...state, new: state.new + action.kudosPoints };
        case 'SAVE_KUDOS_POINTS':
            return {total: action.kudosPoints, new: 0};
        // case 'LEVEL_UP':
        //     return action.kudosRest;
        default:
            return state;
    }
}

function snackbar(state={}, action) {
    switch(action.type) {
        case 'TOGGLE_SNACKBAR':
            return {
                showSnackbar: !state.showSnackbar,
                message: action.message || ""
            };
        default:
            return state;
    }
}

const feedbackApp = combineReducers({
    projectName,
    projects,
    jwt,
    todos,
    todoFilter,
    surveys,
    showMiniNavBar,
    kudosPoints,
});

export default feedbackApp;