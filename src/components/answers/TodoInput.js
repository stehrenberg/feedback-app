import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import TodoList from '../../components/todos/TodoList';
import { addTodo } from '../../actions';

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
            surveyId: this.props.surveyId,
            text: this.state.input,
            completed: false,
        };
        this.props.dispatch(addTodo(newTodo));
        this.setState({ input: ''});
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
            <TodoList surveyId={ this.props.surveyId }/>
        </div>
        );
    }
}

export default connect()(TodoInput);