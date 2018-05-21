import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from '../assets/mayflower_logo.png';
import md5 from 'md5';
import PropTypes from 'prop-types';

import ProjectSelect from '../components/ProjectSelect';
import profile from '../config/profile';

const LogoHeader = ({ title, projectSwitchDisabled, classes }) => (
    <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo"/>
        <div className={ classes.row }>
            <Avatar
                className={ classes.avatar }
                src={ getAvatarURL(profile.email) }
                />
        </div>
        <div>
            <h2>
                { title }
            </h2>
            { projectSwitchDisabled? '' : <ProjectSelect /> }
        </div>
    </div>
);

const getAvatarURL = (email) => {
    const gravatarBaseURL = "https://www.gravatar.com/avatar/";
    const emailHash = md5(profile.email.toLocaleLowerCase());
    const url = `${gravatarBaseURL}${emailHash}?s=200`;

    console.log(emailHash);
    console.log(url);

    return url;
};


LogoHeader.propTypes = {
    title: PropTypes.string.isRequired,
    projectSwitchDisabled: PropTypes.bool,
};

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        position: 'absolute',
        border: "3px solid #000000",
        boxShadow: "0px 0px 1px 3px #ff9999",
        top: 50,
        right: 60,
        width: 70,
        height: 70,
    }
};

export default withStyles(styles)(LogoHeader);