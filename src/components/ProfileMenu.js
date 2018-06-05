import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

const ProfileMenu = ({ onClose, anchorEl = null }) => (
    <React.Fragment>
        <Collapse in={ Boolean(anchorEl) } id="menu-list-collapse" style={{ transformOrigin: '0 0 0' }}>
        <Menu id="simple-menu"
              anchorEl={ anchorEl }
              open={ Boolean(anchorEl) }
              onClose={ onClose }>
            <MenuItem onClick={ onClose }>Ranks</MenuItem>
            <MenuItem onClick={ onClose }>Completed Surveys</MenuItem>
            <MenuItem onClick={ onClose }>Created Todos</MenuItem>
            <MenuItem onClick={ onClose }>Tackled Todos</MenuItem>
        </Menu>
        </Collapse>
    </React.Fragment>
);

export default ProfileMenu;
