import React from 'react';
import PropTypes from 'prop-types';
import TodoItemMiniCard from './TodoItemMiniCard';
import { ListItem } from 'material-ui/List';
import { Checkbox, IconButton } from 'material-ui';
import { connect } from 'react-redux';
import ClearIcon from 'material-ui/svg-icons/content/clear';

const TodoItem = (props) => {
    const { text, completed, todoType, onDelete, isReadOnly } = props;
    const leftCheckbox = <Checkbox className="Checkbox" checked={ completed }/>;
    const optProps = isReadOnly
        ? {}
        : {
        rightIconButton: <IconButton onClick={ () => onDelete(text) }>
            <ClearIcon color={ 'ee0033' }/>
        </IconButton>
    };

    let todoItem;

    switch (todoType) {
        case 'miniCard':
            todoItem = <TodoItemMiniCard {...props}/>;
            break;
        default:
            todoItem = <ListItem className={`TodoItem ${completed? 'completed' : ''}`}
                                 primaryText={ text }
                                 leftCheckbox={ leftCheckbox }
                {...optProps}
            />;
    }

    return todoItem;
};

TodoItem.propTypes = {
    text: PropTypes.string.isRequired,
    surveyId: PropTypes.string.isRequired,
    todoType: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    createdAt: PropTypes.object,
};

export default connect()(TodoItem);