import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';

import { deleteTodo } from '../../actions';
import TodoItem from './TodoItem';

class TodoList extends React.Component {

    render = () => {
        const { todos, dispatch } = this.props;

        return (
            <List key={ todos } className="TodoList" >
                { todos.map(
                    (todo) => <TodoItem key={ todo.id }
                                        text={ todo.text }
                                        completed={ todo.completed }
                                        onDelete={ () => dispatch(deleteTodo(todo.id)) }
                        {...todo}/>) }
            </List>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return { todos: state.todos.filter((todo) => todo.surveyId === ownProps.surveyId) };
};

TodoList.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    surveyId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TodoList);