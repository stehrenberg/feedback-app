import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';
import Moment from 'moment';

import TodoItem from '../../components/todos/TodoItem';
import { apiCall } from '../../util/utils';
import config from '../../config/config.json';

class OpenTodos extends Component {

    componentWillMount = () => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => {
            return data.resource.map((todo) => {
                return {
                    text: todo.text,
                    completed: todo.completed,
                    createdAt: Moment(todo.created_at),
                };
            })
        };
        const errorHandler = (error) => console.log(error);

        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler)
            .then((todosAsArray) => {
                console.log(todosAsArray);
            });
    };

    render = () => {
        return (
            <List>
                { this.props.todos.map(
                    (todo) => <TodoItem key={ todo }
                                        text={ todo.text }
                                        completed={ todo.completed }/>)
                }
            </List>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        todos: [...state.todos]
    };
};

OpenTodos.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps)(OpenTodos);