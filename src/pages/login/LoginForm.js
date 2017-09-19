import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogoHeader from '../../components/LogoHeader';
import LoginBtn from '../../components/buttons/LoginBtn';
import config from '../../config/config.json';
import { setJWT } from '../../actions';
import { fetchDataFrom } from '../../util/utils';

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
        this.authenticate(email, password)
            .then((jwt) => {
                this.props.dispatch(setJWT(jwt));
                this.props.history.push(`/home/${ this.state.projectName }`);
            }).catch((error) => console.log(error));
    }

    handleChange(event) {
        event.preventDefault();
        const fieldName = event.target.name;
        const value = event.target.value;

        this.setState({[fieldName] :  value});
    }

    render() {
        return (
            <div className="LoginMask">
                <LogoHeader title={ "Login" }/>
                <div className="App-content">
                    <form className="login-form Questionnaire" action="" method="" onSubmit={ (event) => this.handleSubmit(event) }>
                        { this.state.loginFailed ? <p>Invalid credentials.</p> : '' }
                        <div className="login-inputfield">
                            <label>Project:</label>
                            <input name="projectName"
                                   type="text"
                                   autoComplete="off"
                                   onChange={ (event) => this.handleChange(event) }
                                   autoFocus
                                   required
                            />
                        </div>
                        <div className="credentials">
                            <div className="login-inputfield">
                                <label>Email:</label>
                                <input name="email"
                                       type="text"
                                       onChange={ (event) => this.handleChange(event) }
                                       required
                                />
                            </div>
                            <div className="login-inputfield">
                                <label>Password:</label>
                                <input name="password"
                                       type="password"
                                       onChange={ (event) => this.handleChange(event) }
                                       required
                                />
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

    authenticate = (email, password) => {
        const apiEndpoint = `${config.dreamfactoryApi.loginEndpoint}session`;
        const httpMethod = 'POST';
        const dataTransformMethod = (jwt) => jwt;
        const errorHandler = (error) => {
            console.log("bla", error);
            this.setState({ loginFailed: true });
        };
        const payload = {
            "email": email,
            "password": password,
            "duration": 0
        };

        return fetchDataFrom(apiEndpoint, httpMethod, dataTransformMethod, errorHandler, payload);
    };
}

LoginForm.PropTypes = {
    history: PropTypes.object.isRequired,
};

export default connect()(LoginForm);