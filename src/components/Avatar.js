import React from 'react';
// import Person from '@material-ui/icons/Person';
import profile from '../config/profile';
import md5 from 'md5';
import MUIAvatar from '@material-ui/core/Avatar';

import ProfileMenu from './ProfileMenu';

const getAvatarURL = (email) => {
    const gravatarBaseURL = "https://www.gravatar.com/avatar/";
    const emailHash = md5(profile.email.toLocaleLowerCase());

    return `${gravatarBaseURL}${emailHash}?s=200`;
};

class Avatar extends React.Component {

    state = {
        anchorEl: null
    };

    render = () => {
        return (
            <React.Fragment>
                <MUIAvatar className={ this.props.className } src={ getAvatarURL(profile.email) } onClick={ this.handleClick }/>
                <ProfileMenu onClose={ this.handleClose } anchorEl={ this.state.anchorEl || null }/>
            </React.Fragment>
        );
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };
}


export default Avatar;