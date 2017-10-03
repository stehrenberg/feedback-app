import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import TodoItem from '../../components/todos/TodoItem';
import LogoHeader from '../../components/LogoHeader';
import { setTodoFilter } from '../../actions';
import { apiCall } from '../../util/utils';
import { config } from '../../config/config';

class FilteredTodos extends Component {

    componentDidMount = () => {
        const todoFilter = this.decodeTodoFilter(this.props.match.params.filter);
        this.props.dispatch(setTodoFilter(todoFilter));
    };

    // TODO Move to TodoList Component after refactoring of FilteredTodos->render()
    componentWillUnmount = () => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos`;
        const httpMethod = 'PATCH';
        const dataTransformMethod = () => {};
        const errorHandler = (error) => console.log(error);
        const payload = {
            "resource": this.props.todos.map((todo) => ({ todo_id: todo.todoId, completed: todo.completed }))
        };

        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
    };

    render = () => {
        const { todos, todoFilter, history} = this.props;

        return (
            <div>
            <LogoHeader title="ToDos" />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="App-content">
                    <div className="Paperbox">
                        <List>
                            { this.getVisibleTodos(todos, todoFilter).map(
                                (todo) => <TodoItem key={ `${todo.text}-${todo.created_at}` }
                                                    todoType="miniCard" {...todo}/>)
                            }
                        </List>
                    </div>
                </div>
                </div>
                <div className="App-footer">
                    <RaisedButton className="nav-btn" label="Back" onClick={ history.goBack } primary={ true } />
                </div>
            </div>
        );
    };

    decodeTodoFilter = (urlParam) => {
        let todoFilter;
        switch(urlParam) {
            case 'open':
                todoFilter = 'SHOW_OPEN';
                break;
            case 'completed':
                todoFilter = 'SHOW_COMPLETED';
                break;
            default:
                todoFilter = 'SHOW_ALL';
        }

        return todoFilter;
    };

    getVisibleTodos = (todos, filter) => {
        let visibleTodos;

        switch(filter) {
            case 'SHOW_COMPLETED':
                visibleTodos = todos.filter((todo) => todo.completed);
                break;
            case 'SHOW_OPEN':
                visibleTodos = todos.filter((todo) => !todo.completed);
                break;
            default:
                visibleTodos = todos;
        }

        return visibleTodos.reverse();
    };

}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        todoFilter: state.todoFilter,
        projectName: state.projectName,
    };
};

FilteredTodos.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    projectName: PropTypes.string.isRequired,
    todoFilter: PropTypes.string,
};

export default connect(mapStateToProps)(FilteredTodos);