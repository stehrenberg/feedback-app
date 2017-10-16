import React from 'react';
import logo from '../assets/mayflower_logo.png';
import PropTypes from 'prop-types';

import ProjectSelect from '../components/ProjectSelect';

const LogoHeader = ({ title }) => (
    <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <div>
            <h2>
                { title }
            </h2>
            <ProjectSelect />
        </div>
    </div>
);

LogoHeader.PropTypes = {
    title: PropTypes.string.isRequired,
};

export default LogoHeader;