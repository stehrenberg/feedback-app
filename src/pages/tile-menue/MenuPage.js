import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';

class MenuPage extends Component {

    render() {
        console.log("japp, hier!");

        return (
            <div>
                <LogoHeader title="Menü" />
                <ul className="menue">
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