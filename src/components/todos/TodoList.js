import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
    return (
        <ul key={ todos }>
            { todos.map(
                (todo) => <TodoItem key={ todo.text }
                                    text={ todo.text }
                                    completed={ todo.completed }/>) }
        </ul>
    )
};

TodoList.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => {
    return { todos: state.todos };
};

export default connect(mapStateToProps)(TodoList);