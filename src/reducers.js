import { combineReducers } from 'react-redux';s
import './actions';

const initialState = {
    projectName: '',
};

const feedbackApp = combineReducers({
   setProject,
});

function setProject(state = '', action) {
    switch(action.type) {
        case 'SET_PROJECT':
            return action.projectName;
        default:
            return state;
    }
}

export default feedbackApp;