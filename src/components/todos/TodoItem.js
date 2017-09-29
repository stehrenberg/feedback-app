import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ text, completed }) => <li className="todo-item">{ text }</li>;

TodoItem.PropTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

export default TodoItem;