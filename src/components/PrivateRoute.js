import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...rest} render={ props => (
        isAuthenticated() ?
        <Component {...props}/> : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>)
      )}/>
    );
};

PrivateRoute.PropTypes = {
    component: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;