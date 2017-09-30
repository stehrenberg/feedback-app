import React from 'react';
import PropTypes from 'prop-types';
import TodoItemMiniCard from './TodoItemMiniCard';

const TodoItem = ({ text, completed, createdAt, surveyId, todoType }) => {

    let todoItem;

    switch(todoType) {
        case 'miniCard':
            todoItem = <TodoItemMiniCard text={ text }
                                         surveyId={ surveyId }
                                         completed={ completed }
                                         createdAt={ createdAt }/>;
            break;
        default:
            todoItem = <li className={`TodoItem ${completed? 'completed' : ''}`}>{ text }</li>;
    }

    return todoItem
};

TodoItem.PropTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

export default TodoItem;