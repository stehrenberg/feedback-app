import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (<p>bla</p>);
        /*<Route {...rest} render={ props => (
        isAuthenticated ?
        <Component {...props}/> : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>)
      )}/>
    );*/
};

export default PrivateRoute;