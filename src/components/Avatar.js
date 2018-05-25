import React from 'react';
// import Person from '@material-ui/icons/Person';
import profile from '../config/profile';
import md5 from 'md5';
import MUIAvatar from '@material-ui/core/Avatar';

const getAvatarURL = (email) => {
    const gravatarBaseURL = "https://www.gravatar.com/avatar/";
    const emailHash = md5(profile.email.toLocaleLowerCase());

    return `${gravatarBaseURL}${emailHash}?s=200`;
};

const Avatar = (props) => {
    return (
        <MUIAvatar
            className={ props.className }
            src={ getAvatarURL(profile.email) }
        />
    );
};

export default Avatar;