import React from 'react';
import { ListItem } from 'material-ui/List';
import Moment from 'moment';
import { Checkbox } from 'material-ui';

const TodoItemMiniCard = ({text, completed, createdAt=Moment()}) => {
    return (
        <ListItem className={ `TodoItem ${completed? 'completed' : ''}` }
                  primaryText={ text }
                  secondaryText={ createdAt.format("YYYY-MM-DD") }
                  leftCheckbox={
                  <Checkbox checked={ completed }/> }
        />
    );
};

export default TodoItemMiniCard;