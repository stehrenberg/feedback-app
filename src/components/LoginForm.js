import React, {Component} from 'react';

import LogoHeader from './LogoHeader';
import LoginBtn from './buttons/LoginBtn';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/home/${ this.state.projectName }`);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ projectName: event.target.value });
    }

    render() {
        return (
            <div className="LoginMask">
                <LogoHeader title={ "Login" }/>
                <div className="App-content">
                    <form className="login-form" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        <label>Projektname:</label>
                        <input type="text" autoComplete="off" onChange={ (event) => this.handleChange(event) }/>
                        <div className="save-btn">
                            <LoginBtn {...this.props.history}  />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;