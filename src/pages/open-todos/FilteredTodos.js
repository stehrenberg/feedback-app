import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import PropTypes from 'prop-types';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

import TodoItem from '../../components/todos/TodoItem';
import LogoHeader from '../../components/LogoHeader';
import { loadOpenTodos } from '../../actions';
import { apiCall } from '../../util/utils';
import config from '../../config/config.json';

class FilteredTodos extends Component {
    
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
            .then((todosAsArray) => this.props.dispatch(loadOpenTodos(todosAsArray)));
    };

    render = () => {
        return (
            <div>
            <LogoHeader title="Open ToDos" />
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
}

const mapStateToProps = (state) => {
    return {
        todos: [...state.todos]//.filter((todo) => !todo.completed) --> not yet...
    };
};

FilteredTodos.PropTypes = {
    todos: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps)(FilteredTodos);