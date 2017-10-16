import React, { Component } from 'react';
import Moment from 'moment';
import { ListItem } from 'material-ui/List';
import { Checkbox } from 'material-ui';
import { connect } from 'react-redux';

import { toggleTodoStatus } from '../../actions';

class TodoItemMiniCard extends Component {

    render = () => {
        const { id, text, completed, createdAt=Moment() } = this.props;

        return (
            <ListItem name={ text }
                      className={ `TodoItem ${completed? 'completed' : ''}` }
                      primaryText={ text }
                      secondaryText={ createdAt.format("YYYY-MM-DD") }
                      leftCheckbox={
                      <Checkbox name={ id }
                                checked={ completed }
                                onCheck={ (event) => this.handleTodoClick(event) }/> }
            />
        );
    };

    handleTodoClick = (event) => {
        const todoId = event.target.name;
        this.props.dispatch(toggleTodoStatus(todoId));
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        completed: state.todos.find((todo) => todo.id === ownProps.id).completed
    }
};

export default connect(mapStateToProps)(TodoItemMiniCard);