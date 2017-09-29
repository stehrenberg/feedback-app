import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { List } from 'material-ui/List';

const TodoList = ({ todos }) => {
    return (
        <List key={ todos }>
            { todos.map(
                (todo) => <TodoItem key={ todo.text }
                                    text={ todo.text }
                                    completed={ todo.completed }/>) }
        </List>
    )
};

TodoList.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => {
    return { todos: state.todos };
};

export default connect(mapStateToProps)(TodoList);