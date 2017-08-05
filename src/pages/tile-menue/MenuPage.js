import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png'
import HistoryIcon from '../../assets/history_icon.png'

import LogoHeader from '../../components/LogoHeader';

class MenuPage extends Component {

    render() {

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto',
            },
        };
        const tilesData = [
            {
                img: AddQuestionnaireIcon,
                title: "New Survey",
                link: "/feedback"
            },
            {
            img: HistoryIcon,
            title: "Past Feedback Data",
            link: "/form-history"
            },
        ];

        return (
                <div className="gridList" style={ styles.root }>
                    <LogoHeader title="Overview" />
                    <GridList
                        cellHeight={ 120 }
                        style={ styles.gridList }>
                        { tilesData.map((tile) => (
                            <Link to={ tile.link }>
                                <GridTile
                                    key={ tile.img }
                                    title={ tile.title }>
                                    <img src={ tile.img } alt={ "" } />
                                </GridTile>
                            </Link>
                        ))}
                    </GridList>
                </div>
        );
    }
}

export default MenuPage;