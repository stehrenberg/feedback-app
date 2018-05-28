import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {saveKudosPoints} from '../actions';
import PinDrop from '@material-ui/icons/PinDrop';

const HIDE_PIN_AND_SNACKBAR_AFTER = 2000;
const SHOW_PIN_AFTER = 250;
const PIN_TRANSITION_LENGTH = '0.2';
const SHOW_SNACKBAR_AFTER = 500;
const FILL_BAR_AFTER = 500;

class KudosBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKudosPin: false,
            showSnackBar: false,
            kudosPinVisible: false,
            newKudosPoints: 0,
            totalKudosPoints: 0,
        };
    }

    componentDidMount() {
        const hasNewKudosPoints = this.props.kudosPoints.new > 0;
        const newTotalKudosPoints = this.props.kudosPoints.total + this.props.kudosPoints.new;
        setTimeout(() => {
            this.setState({
                showKudosPin: hasNewKudosPoints,
                newKudosPoints: this.props.kudosPoints.new,
                totalKudosPoints: newTotalKudosPoints,
            });

            if (hasNewKudosPoints) {
                setTimeout(() => this.setState({
                    kudosPinVisible: true,
                }));

                setTimeout(() => {
                    this.setState({
                        kudosPinVisible: false,
                        showSnackBar: false
                    });
                }, HIDE_PIN_AND_SNACKBAR_AFTER);
            }
        }, SHOW_PIN_AFTER)

        setTimeout(() => {
            this.props.dispatch(saveKudosPoints(newTotalKudosPoints));
        }, FILL_BAR_AFTER);

        setTimeout(() => {
            this.setState({ showSnackBar: hasNewKudosPoints });
        }, SHOW_SNACKBAR_AFTER);
    }

    componentWillUnmount() {
        this.props.dispatch(saveKudosPoints(this.props.kudosPoints.total));
    }

    render() {
        const levelProgress = this.calculateLevelProgress(this.props.kudosPoints.total);
        const pinProgress = this.calculateLevelProgress(this.state.totalKudosPoints);
        const pinWrapperAdditionalStyle = {
            left: `calc(${pinProgress}% - 18px)`,
            transition: `visibility ${PIN_TRANSITION_LENGTH}s, opacity ${PIN_TRANSITION_LENGTH}s linear`,
        };

        if (this.state.kudosPinVisible) {
            pinWrapperAdditionalStyle.visibility = 'visible';
            pinWrapperAdditionalStyle.opacity = '1';
        } else {
            pinWrapperAdditionalStyle.visibility = 'hidden';
            pinWrapperAdditionalStyle.opacity = '0';
        }

        return (
            <div>
                { this.state.showKudosPin && <div className={ this.props.classes.pinWrapper } style={ pinWrapperAdditionalStyle }>
                    <PinDrop className={ this.props.classes.pin } />
                    <p className={ this.props.classes.pinMarker }></p>
                </div> }
                <LinearProgress
                    className={ this.props.classes.kudosBar }
                    color="primary"
                    variant="determinate"
                    value={ levelProgress }/>
                <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={ this.state.showSnackBar }
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>+{this.state.newKudosPoints} Kudos</p>
                    </div> }/>
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
        clipPath: 'inset(0 0 6px 0)',
    },
    pinWrapper: {
        position: 'fixed',
        bottom: 14,
        display: 'flex',
        zIndex: '1000',
        visibility: 'hidden',
        opacity: 0,
    },
    pinMarker: {
        borderRight: '1px solid #000',
        height: 20,
        position: 'absolute',
        top: 13,
        left: 17,
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