import React from 'react';

const TodoList = ({ todos }) => {
    return (
        <ul>
            { todos.map((todo) => <li>{ todo.text }</li>) }
        </ul>
    )
};

TodoList.PropTypes = {
    todos: PropTypes.ArrayOf(PropTypes.string),
};

export default TodoList;