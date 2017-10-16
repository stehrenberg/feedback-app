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
            return action.jwt;
        default:
            return state;
    }
}

function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            const newState = [
                ...state,
                {
                    id: action.newTodo.id,
                    surveyId: action.newTodo.surveyId,
                    text: action.newTodo.text,
                    completed: action.newTodo.completed,
            }];
            console.log(newState);
            return newState;
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

const feedbackApp = combineReducers({
    projectName,
    projects,
    jwt,
    todos,
    todoFilter,
});

export default feedbackApp;