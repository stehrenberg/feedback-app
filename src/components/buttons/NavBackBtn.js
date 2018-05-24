import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const NavBackBtn = ({ history }) => (
    <RaisedButton className="save-btn"
              onClick={ history.goBack }
              icon={ <ArrowBack /> }
              primary={ true }
              label={ "Back home" } />
);

export default NavBackBtn;