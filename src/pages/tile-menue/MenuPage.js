import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';

class MenuPage extends Component {

    render() {
        return (
            <div>
                <LogoHeader title="&Uuml;bersicht" />
                <ul className="menu">
                    <li>
                        <Link to="/feedback">
                            Neuen Fragebogen ausf&uuml;llen
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Alte Frageb&ouml;gen ansehen
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MenuPage;