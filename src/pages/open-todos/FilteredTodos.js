import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

import TodoItem from '../../components/todos/TodoItem';
import LogoHeader from '../../components/LogoHeader';
import { loadTodos, setTodoFilter } from '../../actions';
import { apiCall } from '../../util/utils';
import config from '../../config/config.json';

class FilteredTodos extends Component {

    componentDidMount = () => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos`;
        const httpMethod = 'GET';
        const dataTransformMethod = (data) => {
            return data.resource.map((todo) => {
                return {
                    surveyId: todo.survey_id.toString(),
                    text: todo.text,
                    completed: todo.completed,
                    createdAt: Moment(todo.created_at),
                };
            })
        };
        const errorHandler = (error) => console.log(error);
        const todoFilter = this.decodeTodoFilter(this.props.match.params.filter);

        this.props.dispatch(setTodoFilter(todoFilter));
        apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler)
            .then((todosAsArray) => this.props.dispatch(loadTodos(todosAsArray)));
    };

    render = () => {
        console.log("render called!");
        return (
            <div>
            <LogoHeader title="ToDos" />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="App-content">
                    <div className="Questionnaire">
                        <List>
                            { this.props.todos.map(
                                (todo) => <TodoItem key={ `${todo.text}-${todo.created_at}` }
                                                    todoType="miniCard" {...todo}/>)
                            }
                        </List>
                    </div>
                </div>
                </div>
                <div className="App-footer">
                    <RaisedButton className="nav-btn" label="Back" onClick={ this.props.history.goBack } primary={ true } />
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
        console.log(urlParam, todoFilter);

        return todoFilter;
    };
}

const getVisibleTodos = (todos, filter) => {
    let visibleTodos;

    switch(filter) {
        case 'SHOW_COMPLETED':
            visibleTodos = todos.filter((todo) => todo.completed);
            break;
        case 'SHOW_OPEN':
            visibleTodos = todos.filter((todo) => !todo.completed);
            break;
        default:
            console.log("bla", filter);
            visibleTodos = todos;
    }

    return visibleTodos;
};

const mapStateToProps = (state) => {
    console.log("mapStateToProps called");
    return {
        todos: getVisibleTodos(state.todos, state.todoFilter)
    };
};

FilteredTodos.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps)(FilteredTodos);