import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';

class MenuPage extends Component {

    render() {
        return (
            <div>
                <LogoHeader title="Overview" />
                <ul className="menu">
                    <li>
                        <Link to="/feedback">
                            create new feedback questionnaire
                        </Link>
                    </li>
                    <li>
                        <Link to="/form-history">
                            view old feedback questionnaires
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MenuPage;