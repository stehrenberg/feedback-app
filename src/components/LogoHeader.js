import React from 'react';
import logo from '../assets/mayflower_logo.png';
import PropTypes from 'prop-types';

import ProjectSelect from '../components/ProjectSelect';

const LogoHeader = ({ title, projectSwitchDisabled }) => (
    <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <div>
            <h2>
                { title }
            </h2>
            { projectSwitchDisabled? '' : <ProjectSelect /> }
        </div>
    </div>
);

LogoHeader.propTypes = {
    title: PropTypes.string.isRequired,
    projectSwitchDisabled: PropTypes.bool,
};

export default LogoHeader;