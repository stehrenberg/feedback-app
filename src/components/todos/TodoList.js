import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => {
    return (
        <ul key={ todos }>
            { todos.map((todo) => <li key={ todo.text }>{ todo.text }</li>) }
        </ul>
    )
};

TodoList.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

export default TodoList;