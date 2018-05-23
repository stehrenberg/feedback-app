import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';
import { deleteTodo, addKudosPoints } from '../../actions';
import { apiCall } from '../../util/utils';
import { config } from '../../config/config.js';

class TodoList extends React.Component {

    render() {
        const { todos, dispatch, isReadOnly } = this.props;

        return (
            <List key={ todos } className="TodoList" >
                { todos.map(
                    (todo) => <TodoItem key={ todo.id }
                                        text={ todo.text }
                                        completed={ todo.completed }
                                        isReadOnly={ isReadOnly }
                                        onDelete={ () => {
                                            dispatch(deleteTodo(todo.id));
                                            {/*dispatch(addKudosPoints(-(config.kudosPoints.todo)));*/}
                                            this.deleteTodoFromBE(todo.id);
                                        } }
                        {...todo}/>) }
            </List>
        )
    };

    deleteTodoFromBE = (todoId) => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos/${todoId}`;
        const httpMethod = 'DELETE';
        const dataTransformMethod = () => {};
        const errorHandler = (error) => console.log(error);

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler);
    }
}

const mapStateToProps = (state, ownProps) => {
    return { todos: state.todos.filter((todo) => todo.surveyId === ownProps.surveyId).reverse() };
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    surveyId: PropTypes.string.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TodoList);