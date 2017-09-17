import { combineReducers } from 'redux';
import './actions';

const feedbackApp = combineReducers({
    projectName,
    jwt,
});

function projectName(state = '', action) {
    switch(action.type) {
        case 'SET_PROJECT':
            return action.projectName;
        default:
            return state;
    }
}

function jwt(state = '', action) {
    switch(action.type) {
        case 'LOGIN':
            return action.jwt;
        default:
            return state;
    }
}

export default feedbackApp;