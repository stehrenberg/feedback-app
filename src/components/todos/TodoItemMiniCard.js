import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { ListItem } from 'material-ui/List';
import { Checkbox } from 'material-ui';
import { connect } from 'react-redux';

import { toggleTodoStatus, addKudosPoints} from '../../actions';
import { config } from '../../config/config';

class TodoItemMiniCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingChange: false,
            pendingCompleted: false,
        };
    }

    render() {
        const { id, text, createdAt=Moment() } = this.props;
        const completed = this.state.pendingChange ? this.state.pendingCompleted : this.props.completed;

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
        this.setState({
            pendingChange: true,
            pendingCompleted: !this.props.completed,
        });
        const todoId = event.target.name;
        setTimeout(() => {
            this.props.dispatch(toggleTodoStatus(todoId));
            this.props.dispatch(addKudosPoints(config.kudosPoints.completeTodo));
        }, 500);
    };
}

TodoItemMiniCard.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    createdAt: PropTypes.instanceOf(Date),
};

const mapStateToProps = (state, ownProps) => {
    return {
        completed: state.todos.find((todo) => todo.id === ownProps.id).completed
    }
};

export default connect(mapStateToProps)(TodoItemMiniCard);