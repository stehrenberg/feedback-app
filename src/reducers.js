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
        case 'DELETE_TODO':
            return state.filter((todo) => todo.text !== action.todoText);
        case 'LOAD_TODOS':
            return [...action.todos];
        case 'TOGGLE_TODO_STATUS':
            return state.map((todo) =>
                (todo.todoId === action.todoId)
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
    jwt,
    todos,
    todoFilter,
});

export default feedbackApp;