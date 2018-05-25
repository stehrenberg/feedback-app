import React, {Component} from 'react';
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

PrivateRoute.propTypes = {
    // component: PropTypes.Component.isRequired,
    component: PropTypes.oneOfType([PropTypes.instanceOf(Component), PropTypes.func]),
    isAuthenticated: PropTypes.func.isRequired,
};

export default PrivateRoute;