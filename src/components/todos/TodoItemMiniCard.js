import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Moment from 'moment';
import { Checkbox } from 'material-ui';

class TodoItemMiniCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed,
        }
    }

    render = () => {
        const { text, createdAt=Moment() } = this.props;

        return (
            <ListItem className={ `TodoItem ${this.state.completed? 'completed' : ''}` }
                      primaryText={ text }
                      secondaryText={ createdAt.format("YYYY-MM-DD") }
                      leftCheckbox={
                      <Checkbox checked={ this.state.completed }
                                onCheck={ this.handleCheckboxToggle }/> }
            />
        );
    };

    handleCheckboxToggle = () => {
        this.setState((oldState) => {
            return { completed: !oldState.completed };
        });
    };
}

export default TodoItemMiniCard;