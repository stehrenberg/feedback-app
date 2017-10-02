import React from 'react';
import PropTypes from 'prop-types';
import TodoItemMiniCard from './TodoItemMiniCard';

const TodoItem = (props) => {
    const { text, completed, todoType } = props;
    let todoItem;

    switch(todoType) {
        case 'miniCard':
            todoItem = <TodoItemMiniCard {...props}/>;
            break;
        default:
            todoItem = <li className={`TodoItem ${completed? 'completed' : ''}`}>{ text }</li>;
    }

    return todoItem;
};

TodoItem.PropTypes = {
    text: PropTypes.string.isRequired,
    surveyId: PropTypes.string.isRequired,
    todoType: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.object,
};

export default TodoItem;