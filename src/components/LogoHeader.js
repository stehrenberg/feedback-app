import React from 'react';
import logo from '../assets/mayflower_logo.png';

const LogoHeader = ({ title }) => (
    <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <h2>{ title }</h2>
    </div>
);

export default LogoHeader;