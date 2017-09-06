import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        console.log(event.target);
        //this.setState({ projectName: event.target.value });
    }

    render() {
        return (
            <div className="LoginMask">
                <LogoHeader title={ "Login" }/>
                <div className="App-content">
                    <form className="login-form Questionnaire" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        <div className="login-inputfield">
                            <label>Project:</label>
                            <input name="projectName"
                                   type="text"
                                   autoComplete="off"
                                   onChange={ (event) => this.handleChange(event) }
                                   autofocus
                                   required
                            />
                        </div>
                        <div className="credentials">
                            <div className="login-inputfield">
                                <label>Customer:</label>
                                <input name="customerName"
                                       type="text"
                                       autoComplete="off"
                                       onChange={ (event) => this.handleChange(event) }
                                />
                            </div>
                            <div className="login-inputfield">
                                <label>Password:</label>
                                <input name="password"
                                       type="password"
                                       onChange={ (event) => this.handleChange(event) }/>
                            </div>
                        </div>

                        <div className="login-btn">
                            <LoginBtn {...this.props.history}  />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

LoginForm.PropTypes = {
    history: PropTypes.object.isRequired,
};

export default LoginForm;