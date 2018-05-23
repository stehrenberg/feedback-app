import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

class Achievement extends React.Component {

    componentDidUpdate = () => {
        this.
        setTimeout(this.setState({ open: false }));
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>Open with Fade Transition</Button>
                <Snackbar
                    open={this.props.show}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">I love snacks</span>}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        show: state.achievementUnlocked,
        title: state.achievement.title,
        text: state.achievement.text,
    }
};

export default connect(mapStateToProps)(Achievement);