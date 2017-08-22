import React from 'react';
import { Route } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const LoginButton = (props) => (
    <Route render={({ history }) => (
    <RaisedButton type='submit' secondary={ true }>
      Login
    </RaisedButton>
  )} />
);

export default LoginButton;