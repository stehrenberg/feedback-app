import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import LogoHeader from '../../components/LogoHeader';
import LoginBtn from '../../components/buttons/LoginBtn';
import { config } from '../../config/config';
import { setJWT } from '../../actions';
import { apiCall } from '../../util/utils';

class LoginForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loginFailed: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.authenticate(email, password)
            .then((jwt) => {
                localStorage.setItem("sessionToken", JSON.stringify(jwt));
                this.props.dispatch(setJWT(jwt));
                this.props.history.push("/home/");
            }).catch((error) => console.log(error));
    }

    handleChange(event) {
        event.preventDefault();
        const fieldName = event.target.name;
        const value = event.target.value;

        this.setState({[fieldName] :  value});
    }

    render() {
        const INVALID_CREDS_MSG = 'Invalid credentials';

        return (
            <div className="LoginMask">
                <LogoHeader title={ "Cooperation Feedback App" } projectSwitchDisabled={ "true" }/>
                <div className="App-content">
                    <form className="login-form Paperbox" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        <div className="credentials">
                            <TextField
                                name="email"
                                placeholder="Enter your Email"
                                floatingLabelText="Your User ID:"
                                floatingLabelFixed={true}
                                errorText={ this.state.loginFailed ? INVALID_CREDS_MSG : "" }
                                type="text"
                                onChange={ (event) => this.handleChange(event) }
                                required
                            />
                            <TextField
                                name="password"
                                floatingLabelText="Your Password:"
                                floatingLabelFixed={true}
                                errorText={ this.state.loginFailed ? INVALID_CREDS_MSG : "" }
                                type="password"
                                onChange={ (event) => this.handleChange(event) }
                                required
                            />
                        </div>
                        <div className="login-btn">
                            <LoginBtn {...this.props.history}  />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    authenticate = (email, password) => {
        const apiEndpoint = `${config.dreamfactoryApi.loginEndpoint}session`;
        const httpMethod = 'POST';
        const dataTransformMethod = (jwt) => jwt;
        const errorHandler = (error) => this.setState({ loginFailed: true });
        const payload = {
            "email": email,
            "password": password,
            "duration": 0
        };

        return apiCall(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
    };
}

LoginForm.propTypes = {
    history: PropTypes.object.isRequired,
};

export default connect()(LoginForm);