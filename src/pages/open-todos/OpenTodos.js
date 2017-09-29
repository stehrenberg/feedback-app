import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';

import TodoItem from '../../components/todos/TodoItem';

const OpenTodos = ({ todos }) => {
    return (
        <List>
            { todos.map((todo) => <TodoItem key={ todo } text={ todo.text } completed={ todo.completed }/>) }
        </List>
    );
};

OpenTodos.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

export default connect()(OpenTodos);