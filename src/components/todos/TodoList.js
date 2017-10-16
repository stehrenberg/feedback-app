import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';
import { deleteTodo } from '../../actions';
import { apiCall } from '../../util/utils';
import { config } from '../../config/config.js';

class TodoList extends React.Component {

    render = () => {
        const { todos, dispatch } = this.props;

        return (
            <List key={ todos } className="TodoList" >
                { todos.map(
                    (todo) => <TodoItem key={ todo.id }
                                        text={ todo.text }
                                        completed={ todo.completed }
                                        onDelete={ () => {
                                            dispatch(deleteTodo(todo.id));
                                            this.deleteTodoFromBE(todo.id);
                                        } }
                        {...todo}/>) }
            </List>
        )
    };

    deleteTodoFromBE = (todoId) => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos/${todoId}`;
        console.log(apiEndpoint);
        const httpMethod = 'DELETE';
        const dataTransformMethod = (data) => console.log(data);
        const errorHandler = (error) => console.log(error);

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler);
    }
}

const mapStateToProps = (state, ownProps) => {
    return { todos: state.todos.filter((todo) => todo.surveyId === ownProps.surveyId) };
};

TodoList.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    surveyId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TodoList);