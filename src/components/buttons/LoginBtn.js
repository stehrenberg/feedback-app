import React from 'react';
import { Route } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const LoginButton = (props) => (
    <Route render={({ history }) => (
    <RaisedButton type='submit' label="Login" secondary={ true }/>
  )} />
);

export default LoginButton;