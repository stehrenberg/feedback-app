import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import TodoList from '../../components/todos/TodoList';

class TodoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            todos: [],
        };
    }

    handleChange  = (event) => {
        this.setState({ input:  event.target.value});
        console.log(this.state);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newTodo = { text: this.state.input };
        this.state.todos.push(newTodo);
        this.setState({ input: ''});
        console.log(this.state);
    };

    render() {
        return(
            <div className="todos">
            <div className="todo-input">
                <TextField
                    name="add-todo"
                    value={ this.state.input }
                    hintText="Add item..."
                    autoComplete="off"
                    onChange={ this.handleChange }/>
                <button type="submit" label="Add" onClick={ (event) => this.handleSubmit(event) } />
            </div>
            <TodoList todos={ this.state.todos }/>
        </div>
        );
    }
}


export default TodoInput;