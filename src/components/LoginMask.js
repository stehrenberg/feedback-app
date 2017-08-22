import React, {Component} from 'react';

class LoginMask extends Component {

    handleSubmit(event) {
        event.preventDefault();

    }

    render(props) {
        return (
            <div className="LoginForm">
                <form action="" method="" onSubmit={ (event) => handleSubmit(event) }>
                    <label>Projektname</label>
                    <input type="text" autoComplete="off"/>
                    <button type="submit"/>
                </form>
            </div>
        );
    }

}