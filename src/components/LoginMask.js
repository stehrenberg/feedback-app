import React, {Component} from 'react';

import LogoHeader from './LogoHeader';
import SaveBtn from './SaveBtn';

class LoginMask extends Component {

    handleSubmit(event) {
        event.preventDefault();

    }

    render(props) {
        return (
            <div className="LoginMask">
                <LogoHeader title={ "Login" }/>
                <form action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                    <label>Projektname</label>
                    <input type="text" autoComplete="off"/>
                    <SaveBtn />
                </form>
            </div>
        );
    }

}

export default LoginMask;