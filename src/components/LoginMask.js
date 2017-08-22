import React, {Component} from 'react';

import LogoHeader from './LogoHeader';
import LoginBtn from './buttons/LoginBtn';

class LoginMask extends Component {

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="LoginMask">
                <LogoHeader title={ "Login" }/>
                <div className="App-content">
                    <form className="login-form" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        <label>Projektname:</label>
                        <input type="text" autoComplete="off"/>
                        <div className="save-btn">
                            <LoginBtn {...this.props.history} />
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default LoginMask;