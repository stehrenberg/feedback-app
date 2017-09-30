import React from 'react';

import TileMenu from '../../components/TileMenu';
import LogoHeader from '../../components/LogoHeader';
import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png';
import HistoryIcon from '../../assets/history_icon.png';
import OpenTodosIcon from '../../assets/open_todos_icon.png';
import config from '../../config/config.json';

import './appMenu.css';

const MenuPage = (props) => {

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
            img: OpenTodosIcon,
            title: "Open Todos",
            link: "/todos/open"
        },
    ];

    config.appConfig.projectName = props.match.params.projectName;

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