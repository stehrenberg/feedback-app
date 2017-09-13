import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LogoHeader from '../../components/LogoHeader';
import LoginBtn from '../../components/buttons/LoginBtn';
import config from '../../config/config.json';
import { fetchDataFrom } from '../../util/utils';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const userName = this.state.userName;
        const password = this.state.password;
        const jwt = this.authenticate(userName, password);

        this.props.history.push(`/home/${ this.state.projectName }`);
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

    authenticate = (username, password) => {

        const jwt = {};
        const apiEndpoint = `${config.dreamfactoryApi.loginEndpoint}session`;
        const httpMethod = 'POST';
        const dataTransformMethod = (data) => console.log(data);

            /**data..map((resultTuple) => {
            return {
                id: resultTuple.question_id,
                questionValue: resultTuple.question_answer,
            };*/

        const payload = {
            "email": username,
            "password": password,
            "duration": 0
        };
        console.log(fetchDataFrom);
        console.log("bla", fetchDataFrom(apiEndpoint, 'POST', payload, (data) => { console.log(data) }));

        return jwt;
    };
}

LoginForm.PropTypes = {
    history: PropTypes.object.isRequired,
};

export default LoginForm;