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

    console.log("reducer jwt --> action: ", action);

    switch(action.type) {
        case 'LOGIN':
            return action.jwt;
        default:
            return state;
    }
}

const feedbackApp = combineReducers({
    projectName,
    jwt,
});

export default feedbackApp;