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
                    surveyId: action.newTodo.surveyId,
                    text: action.newTodo.text,
                    completed: action.newTodo.completed,
            }];

        case 'LOAD_OPEN_TODOS':
            return [...action.openTodos];
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