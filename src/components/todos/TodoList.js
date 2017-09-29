import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
    return { todos: state.todos };
};

export default connect(mapStateToProps)(TodoList);