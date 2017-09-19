import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class AlertBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
        }
    }

    handleClose = () =>  this.setState({ show: false });

    render() {
        const actions = this.props.btnTexts.map((text) => {
            return <FlatButton
                key={ text }
                label={ text }
                primary={ true }
                onClick={ this.handleClose }
            />;
        });

        return (
            <div>
                <Dialog
                    actions={ actions }
                    modal={ false }
                    open={ this.state.show }
                    onRequestClose={ this.props.handleClose }
                    contentStyle={{ width: 350, textAlign: 'center' }}
                >
                    { this.props.dialogText }
                </Dialog>
            </div>
        );
    }
}

AlertBox.PropTypes = {
    show: PropTypes.bool.isRequired,
    dialogText: PropTypes.string.isRequired,
    btnTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
};