import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

const ProfileMenu = ({ onClose, classes, anchorEl = null }) => (
    <React.Fragment>
        <Collapse in={ Boolean(anchorEl) } id="menu-list-collapse" style={{ transformOrigin: '0 0 0' }}>
        <Menu id="profile-menu"
              classes={ classes.root }
              anchorEl={ anchorEl }
              open={ Boolean(anchorEl) }
              onClose={ onClose }>
            <MenuItem classes={ classes.menuItem } onClick={ onClose }>Ranks</MenuItem>
            <MenuItem classes={ classes.menuItem } onClick={ onClose }>Completed Surveys</MenuItem>
            <MenuItem classes={ classes.menuItem } onClick={ onClose }>Created Todos</MenuItem>
            <MenuItem classes={ classes.menuItem } onClick={ onClose }>Tackled Todos</MenuItem>
        </Menu>
        </Collapse>
    </React.Fragment>
);

const styles = {
    root: {
        height: 500,
    },
    menuItem: {
        color: '#ff00ff',
    },
};

export default withStyles(styles)(ProfileMenu);
