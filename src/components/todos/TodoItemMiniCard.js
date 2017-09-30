import React from 'react';

const TodoItemMiniCard = ({text, completed, createdAt}) => {
    return (
        <ListItem primaryText={ text } secondaryText={ createdAt } />
    );
};

export default TodoItemMiniCard;