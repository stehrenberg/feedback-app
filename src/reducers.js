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

function jwt(state = {}, action) {
    switch(action.type) {
        case 'LOGIN':
            return action.jwt;
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
                text: action.newTodo.text,
                completed: action.newTodo.completed,
            }];
        default:
            return state;
    }
}

const feedbackApp = combineReducers({
    projectName,
    jwt,
    todos,
});

export default feedbackApp;