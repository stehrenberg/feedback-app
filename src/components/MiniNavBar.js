import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    root: {
        position: 'fixed',
        top: 0,
        height: 40,
        width: '100%',
        backgroundColor: '#003a57',
    },
    icon: {
        paddingTop: 0,
        color: "#ea7400 !important",
        cursor: "pointer",
    }
};

class MiniNavBar extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.history.push(value);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation
                value={ value }
                onChange={ this.handleChange }
                showLabels
                className={ classes.root }
            >
                <BottomNavigationAction className={ classes.icon } value='/home/' icon={<HomeIcon />} />
            </BottomNavigation>
        );
    }
}

MiniNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniNavBar);