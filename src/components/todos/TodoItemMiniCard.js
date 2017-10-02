import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Moment from 'moment';
import { Checkbox } from 'material-ui';
import { connect } from 'react-redux';
import { toggleTodoStatus } from '../../actions';

class TodoItemMiniCard extends Component {

    render = () => {
        const { text, completed, createdAt=Moment() } = this.props;

        return (
            <ListItem name={ text }
                      className={ `TodoItem ${completed? 'completed' : ''}` }
                      primaryText={ text }
                      secondaryText={ createdAt.format("YYYY-MM-DD") }
                      leftCheckbox={
                      <Checkbox name={ text }
                                checked={ completed }
                                onCheck={ (event) => this.handleTodoClick(event) }/> }
            />
        );
    };

    handleTodoClick = (event) => {
        const todoText = event.target.name;
        this.props.dispatch(toggleTodoStatus(todoText));
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        completed: !(state.todos.find((todo) => todo.text === ownProps.text).completed)
    }
};

export default connect()(TodoItemMiniCard);