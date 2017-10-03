import React from 'react';
import PropTypes from 'prop-types';
import TodoItemMiniCard from './TodoItemMiniCard';
import { ListItem } from 'material-ui/List';
import { Checkbox } from 'material-ui';

const TodoItem = (props) => {
    const { text, completed, todoType } = props;
    let todoItem;

    switch(todoType) {
        case 'miniCard':
            todoItem = <TodoItemMiniCard {...props}/>;
            break;
        default:
            todoItem = <ListItem className={`TodoItem ${completed? 'completed' : ''}`}
                                 primaryText={ text }
                                 leftCheckbox={
                                    <Checkbox className="Checkbox"
                                        disabled={ true }
                                        checked={ completed }/>
                                 }/>;
    }

    return todoItem;
};

TodoItem.PropTypes = {
    text: PropTypes.string.isRequired,
    surveyId: PropTypes.string.isRequired,
    todoType: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.object,
};

export default TodoItem;