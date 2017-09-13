import { combineReducers } from 'redux';
import './actions';

const feedbackApp = combineReducers({
    projectName,
});

function projectName(state = '', action) {
    switch(action.type) {
        case 'SET_PROJECT':
            return action.projectName;
        default:
            return state;
    }
}

export default feedbackApp;