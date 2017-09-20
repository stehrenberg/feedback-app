import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const AlertBox = (props) => {
    const actions = props.btnTexts.map((text) => {
        return <FlatButton
            key={ text }
            label={ text }
            primary={ true }
            onClick={ props.handleClose }
        />;
    });

    return (
        <div>
            <Dialog
                actions={ actions }
                modal={ false }
                open={ props.show }
                onRequestClose={ props.handleClose }
                contentStyle={{ width: 350, textAlign: 'center' }}
            >
                { props.dialogText }
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