import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {saveKudosPoints} from '../actions';
import PinDrop from '@material-ui/icons/PinDrop';

class KudosBar extends React.Component {
    componentDidMount() {
        const newTotalKudosPoints = this.props.kudosPoints.total + this.props.kudosPoints.new;
        this.props.dispatch(saveKudosPoints(newTotalKudosPoints));
    }

    componentWillUnmount() {
        this.props.dispatch(saveKudosPoints(this.props.kudosPoints.total));
    }

    render() {
        const levelProgress = this.calculateLevelProgress(this.props.kudosPoints.total);

        return (
            <div>
                <div className={ this.props.classes.pinWrapper }>
                    <PinDrop className={ this.props.classes.pin } />
                    <p className={ this.props.classes.pinText }>+5 XP</p>
                </div>
                <LinearProgress
                    className={ this.props.classes.kudosBar }
                    color="primary"
                    variant="determinate"
                    value={ levelProgress }/>
            </div>
        );
    }

    calculateLevelProgress(kudosPoints) {
        return (kudosPoints % 100);
    }
}

const mapStateToProps = (state) => {
    return {
        kudosPoints: {...state.kudosPoints},
    }
};

const styles = {
    pin: {
        height: 35,
        width: 35,
    },
    pinWrapper: {
        position: 'fixed',
        bottom: 14,
        left: 28,
        display: 'flex',
    },
    pinText: {
        margin: '5px 0',
    },
    kudosBar: {
        bottom: 0,
        zIndex: 300,
        position: 'fixed',
        width: "100%",
        height: 20,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(KudosBar));