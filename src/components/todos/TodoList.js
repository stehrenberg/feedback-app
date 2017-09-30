import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { List } from 'material-ui/List';

const TodoList = ({ surveyId, todos }) => {
    return (
        <List key={ todos }>
            { todos.map(
                (todo) => <TodoItem key={ todo.text } {...todo}/>) }
        </List>
    )
};

TodoList.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    surveyId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return { todos: state.todos.filter((todo) => todo.surveyId === ownProps.surveyId) };
};

export default connect(mapStateToProps)(TodoList);