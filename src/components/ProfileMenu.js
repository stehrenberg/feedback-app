import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import RankIcon from '@material-ui/icons/Star';
import CompletedSurveysIcon from '@material-ui/icons/NoteAdd';
import CompletedTodosIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddedTodosIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';

import profile from '../config/profile';
import { config } from '../config/config';

const supporterRank = profile.currentRank;
const supporterColor = config.rank[supporterRank].color;

const ProfileMenu = ({onClose, classes, show, anchorEl = null}) => (
    <React.Fragment>
        <Collapse in={ show } id="menu-list-collapse" style={{transformOrigin: '0 1 0'}}>
            <Menu classes={ classes.root }
                  anchorEl={ anchorEl }
                  open={ show }
                  onClose={ onClose }>
                <MenuItem classes={ classes.menuItem } onClick={ onClose }>
                    <RankIcon style={{fill: supporterColor}}/>
                    <Typography style={{ fontSize: 12, color: '#88878B', fontWeight: 450, textAlign: 'left' }}>Rank</Typography>
                </MenuItem>

                <MenuItem classes={ classes.menuItem } onClick={ onClose }>
                    <CompletedSurveysIcon style={{fill: supporterColor}}/>
                    <Typography style={{ fontSize: 12, color: '#88878B', fontWeight: 450, textAlign: 'left' }}>Completed Surveys</Typography>
                </MenuItem>


                <MenuItem classes={ classes.menuItem } onClick={ onClose }>
                    <AddedTodosIcon style={{fill: supporterColor}}/>
                    <Typography style={{ fontSize: 12, color: '#88878B', fontWeight: 450, textAlign: 'left' }}>Created Todos</Typography>
                </MenuItem>

                <MenuItem classes={ classes.menuItem } onClick={ onClose }>
                    <CompletedTodosIcon style={{fill: supporterColor}}/>
                    { profile.todoCount }
                    <Typography style={{ fontSize: 12, color: '#88878B', fontWeight: 450, textAlign: 'left' }}>Completed Todos</Typography>
                </MenuItem>

            </Menu>
        </Collapse>
    </React.Fragment>
);

const styles = {
    completedSurveyIcon: {
        color: '#ea7400'//
    }
};

export default withStyles(styles)(ProfileMenu);
