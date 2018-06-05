import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import profile from '../config/profile';

class ProfileMenu extends React.Component {
    state = {
        showMenu: true,
    };

    render = () => {

        const { classes } = this.props;

        const menuItems = (
            <div className={ classes.list }>
                <List>
                    <ListItem>
                        <span>{ `Rank: ${ profile.currentRank }` }</span>
                    </ListItem>
                    <ListItem>
                        <span>{ `${ profile.surveyCount } Fragebögen ausgefüllt` }</span>
                    </ListItem>
                    <ListItem>
                        <span>{ `Todos erledigt: 0 ` }</span>
                    </ListItem>
                    <ListItem>
                        <span>{ `Feedback-Intervall: Alle ${ profile.feedbackIntervallInWeeks } Wochen` }</span>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <span>Logout</span>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <Drawer anchor="top" open={ this.state.showMenu } onClose={ () => this.toggleMenu(false)}>
                <div
                    tabIndex={ 0 }
                    role="button"
                    onClick={ () => this.toggleMenu(false) }
                    onKeyDown={ () => this.toggleMenu(false) }
                >
                    { menuItems }
                </div>
            </Drawer>
        );
    };

    toggleMenu = (showMenu) => this.setState({showMenu});


}

ProfileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    list: {
        width: 250,
    },
};

export default withStyles(styles)(ProfileMenu);