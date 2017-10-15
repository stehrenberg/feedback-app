import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const AlertBox = (props) => {
    const {
        btnTexts,
        handleClose,
        show,
        overlayStyle,
        style,
        dialogText
    } = this.props;

    const actions = btnTexts.map((text) => {
        return <FlatButton
            key={ text }
            label={ text }
            primary={ true }
            onClick={ handleClose }
        />;
    });

    return (
        <div>
            <Dialog
                actions={ actions }
                modal={ false }
                open={ show }
                onRequestClose={ handleClose }
                contentStyle={{ width: 350, textAlign: 'center' }}
                overlayStyle={ overlayStyle }
                style={ style }
            >
                { dialogText }
            </Dialog>
        </div>
    );
};

AlertBox.PropTypes = {
    show: PropTypes.bool.isRequired,
    dialogText: PropTypes.string.isRequired,
    btnTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AlertBox;