import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';

import TodoList from '../../components/todos/TodoList';
import { addTodo } from '../../actions';
import { apiCall } from '../../util/utils';
import { config } from '../../config/config.js';

class TodoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };
    }

    handleChange  = (event) => this.setState({ input:  event.target.value});

    handleClick = (event) => {
        event.preventDefault();
        const newTodo = {
            id: uuidv1(),
            surveyId: this.props.surveyId,
            text: this.state.input,
            completed: false,
        };

        this.props.dispatch(addTodo(newTodo));
        this.setState({ input: ''});
        // TODO belongs in Middleware - refactor when introducing one!
        this.saveTodo(newTodo);
    };

    render() {
        return(
            <div className="todos">
            <div className="todo-input">
                { this.props.isReadOnly ?
                    ''
                    : <TextField
                            name="add-todo"
                            value={ this.state.input }
                            hintText="Add item..."
                            fullWidth={ true }
                            autoComplete="off"
                            onChange={ this.handleChange }/>
                }
                <div>
                    <button type="submit" label="Add" onClick={ (event) => this.handleClick(event) } />
                </div>
            </div>
            <TodoList surveyId={ this.props.surveyId } isReadOnly={ this.props.isReadOnly }/>
        </div>
        );
    }

    saveTodo = (newTodo) => {
        const apiEndpoint = `${config.dreamfactoryApi.apiBaseUrl}_table/todos`;
        const httpMethod = 'POST';
        const dataTransformMethod = () => {};
        const errorHandler = (error) => console.log(error);
        const todoToSave = {
            todo_id: newTodo.id,
            survey_id: newTodo.surveyId,
            text: newTodo.text,
            completed: newTodo.completed
        };
        const payload = {
            'resource': todoToSave
        };

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
    };
}

export default connect()(TodoInput);