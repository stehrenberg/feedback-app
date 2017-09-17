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
        };
        console.log("dispatch: ", this.props.dispatch);
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const jwt = this.authenticate(email, password)
            .then((jwt) => {
                console.log("jwt:", jwt);
                this.props.dispatch(setJWT(jwt));
                this.props.history.push(`/home/${ this.state.projectName }`);
            });
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

    authenticate = (email, password) => {
        const apiEndpoint = `${config.dreamfactoryApi.loginEndpoint}session`;
        const httpMethod = 'POST';
        const dataTransformMethod = (data) => console.log(data);
        const payload = {
            "email": email,
            "password": password,
            "duration": 0
        };

        return fetchDataFrom(apiEndpoint, 'POST', (jwt) => jwt, payload);
    };
}

LoginForm.PropTypes = {
    history: PropTypes.object.isRequired,
};

export default connect()(LoginForm);