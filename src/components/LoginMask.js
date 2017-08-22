import React, {Component} from 'react';

import LogoHeader from './LogoHeader';
import SaveBtn from './SaveBtn';

class LoginMask extends Component {

    handleSubmit(event) {
        event.preventDefault();
        //TODO Kundennamen im store ablegen


    }

    render(props) {
        return (
            <div className="LoginMask">
                <LogoHeader title={ "Login" }/>
                <div className="App-content">
                    <form className="login-form" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        <label>Projektname:</label>
                        <input type="text" autoComplete="off"/>
                        <div className="save-btn">
                            <SaveBtn className="save-btn"/>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default LoginMask;