import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { config } from '../config/config';
import profile from '../config/profile';
import {levelUp} from "../actions";

const KudosBar = (props) => (
    <LinearProgress
        className={ props.classes.kudosBar }
        color="primary"
        variant="determinate"
        value={ calculateLevelProgress(props.kudosPoints) }/>
);

const calculateLevelProgress = (kudosPoints) => {
    return (kudosPoints % 100);
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        kudosPoints: state.kudosPoints,
    }
};

const styles = {
    kudosBar: {
        bottom: 0,
        zIndex: 300,
        position: 'fixed',
        width: "100%",
        height: 10,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(KudosBar));