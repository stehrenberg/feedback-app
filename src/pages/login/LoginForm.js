import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import LogoHeader from '../../components/LogoHeader';
import LoginBtn from '../../components/buttons/LoginBtn';
import { config } from '../../config/config.json';
import { setJWT, setProject } from '../../actions';
import { apiCall } from '../../util/utils';

class LoginForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            loginFailed: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const projectName = this.state.projectName;
        this.authenticate(email, password)
            .then((jwt) => {
                this.props.dispatch(setJWT(jwt));
                this.props.history.push(`/home/${ this.state.projectName }`);
                localStorage.setItem("sessionToken", JSON.stringify(jwt));
                localStorage.setItem("projectName", this.state.projectName);
            }).catch((error) => console.log(error));
        this.props.dispatch(setProject(projectName));
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
                <LogoHeader title={ "Login" }/>
                <div className="App-content">
                    <form className="login-form Questionnaire" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        <TextField
                            name="projectName"
                            floatingLabelText="Project"
                            floatingLabelFixed={true}
                            type="text"
                            autoComplete="off"
                            onChange={ (event) => this.handleChange(event) }
                            autoFocus
                            required
                        />
                        <div className="credentials">
                            <TextField
                                name="email"
                                floatingLabelText="Email"
                                floatingLabelFixed={true}
                                errorText={ this.state.loginFailed ? INVALID_CREDS_MSG : "" }
                                type="text"
                                onChange={ (event) => this.handleChange(event) }
                                required
                            />
                            <TextField
                                name="password"
                                floatingLabelText="Password"
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

LoginForm.PropTypes = {
    history: PropTypes.object.isRequired,
};

export default connect()(LoginForm);