import React from 'react';

import TileMenu from '../../components/TileMenu';
import LogoHeader from '../../components/LogoHeader';
import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png'
import HistoryIcon from '../../assets/history_icon.png'

import './appMenu.css';

const MenuPage = () => {

    const tileData = [
        {
            img: AddQuestionnaireIcon,
            title: "New Survey",
            link: "/feedback"
        },
        {
            img: HistoryIcon,
            title: "Past Surveys",
            link: "/form-history"
        },
        {
            img: HistoryIcon,
            title: "...",
            link: "/form-history"
        },
    ];

    return (
        <div>
            <LogoHeader title="Overview" />
            <TileMenu className="TileMenu"
                      tileData={ tileData }
                      cols={ 3 }
                      rows={ 2 } />
        </div>
    );
};

export default MenuPage;