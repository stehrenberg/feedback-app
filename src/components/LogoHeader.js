import React from 'react';
import {connect} from 'react-redux';
import {toggleMiniNavBar} from '../actions'
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ScrollTrigger from 'react-scroll-trigger';
import md5 from 'md5';
import PropTypes from 'prop-types';

import ProjectSelect from '../components/ProjectSelect';
import KudosBar from '../components/KudosBar';
import { config } from '../config/config';
import profile from '../config/profile';
import logo from '../assets/mayflower_logo.png';

class LogoHeader extends React.Component {

    onEnterViewport = () => {
        this.props.dispatch(toggleMiniNavBar(false));
    };

    onExitViewport = () => {
        this.props.dispatch(toggleMiniNavBar(true));
    };

    render = () => {
        const {title, projectSwitchDisabled, classes, history} = this.props;

        return (
            <div className="App-header">
                <ScrollTrigger className="ScrollTrigger" onEnter={ this.onEnterViewport }
                               onExit={ this.onExitViewport }>
                    <img src={ logo } className="App-logo" alt="logo" onClick={ () => history.push("/home/") }/>
                </ScrollTrigger>
                <div className={ classes.row }>
                    <Avatar
                        className={ classes.avatar }
                        src={ this.getAvatarURL(profile.email) }
                    />
                    <KudosBar value={ 42 }/>
                </div>
                <div>
                    <h2>{ title }</h2>
                    { projectSwitchDisabled ? '' : <ProjectSelect /> }
                </div>
            </div>
        )
            ;
    };

    getAvatarURL = (email) => {
        const gravatarBaseURL = "https://www.gravatar.com/avatar/";
        const emailHash = md5(profile.email.toLocaleLowerCase());

        return `${gravatarBaseURL}${emailHash}?s=200`;
    };
}

LogoHeader.propTypes = {
    title: PropTypes.string.isRequired,
    projectSwitchDisabled: PropTypes.bool,
};

const ownRank = profile.currentRank;

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        position: 'absolute',
        border: `4px solid ${ config.rank[ownRank].color }`,
        top: 80,
        right: '3%',
        width: 70,
        height: 70,
    }
};

export default connect()(withStyles(styles)(LogoHeader));