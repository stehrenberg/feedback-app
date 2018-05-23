import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slide from '@material-ui/core/Slide';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    root: {
        position: 'fixed',
        zIndex: '100',
        top: 0,
        height: 100,
        width: '100%',
        backgroundColor: '#003a57',
    },
    icon: {
        paddingBottom: 5,
        cursor: "pointer",
    }
};

class MiniNavBar extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
        this.props.history.push(value);
    };

    render() {
        const {classes, show} = this.props;
        const {value} = this.state;

        return (
            <Slide direction="down" in={ show } mountOnEnter unmountOnExit>
                <BottomNavigation
                    value={ value }
                    onChange={ this.handleChange }
                    showLabels
                    className={ classes.root }
                >
                    <BottomNavigationAction className={ classes.icon }
                                            value='/home/'
                                            icon={ <HomeIcon style={{ fontSize: 32, color: '#ea7400' }}/> }
                    />
                </BottomNavigation>
            </Slide>
        );
    }
}

MiniNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniNavBar);