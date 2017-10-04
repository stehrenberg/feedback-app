import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const NavBackBtn = ({ history }) => (
    <RaisedButton className="nav-btn"
              onClick={ history.goBack }
              icon={ <ArrowBack /> }
              primary={ true }
              label={ "Back" } />
);

export default NavBackBtn;