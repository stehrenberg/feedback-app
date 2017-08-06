import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';

import AddQuestionnaireIcon from '../../assets/add-questionnaire_icon.png'
import HistoryIcon from '../../assets/history_icon.png'
import LogoHeader from '../../components/LogoHeader';

import './menuPage.css';

class MenuPage extends Component {

    render() {

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'space-between',
                justifyContent: 'center',
                paddingTop: 60,
            },
            gridList: {
                width: 540,
                height: 380,
                overflowY: 'auto',
            },
            title: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#00BCD4',
                textAlign: 'center',
                marginLeft: 0,
            }
        };

        const tilesData = [
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
            {
                img: HistoryIcon,
                title: "...",
                link: "/form-history"
            },
            {
                img: HistoryIcon,
                title: "...",
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
                <div className="gridList" style={ styles.root }>
                    <GridList
                        className="GridList"
                        cols={ 3 }
                        rows={ 2 }
                        cellHeight={ 180 }
                        style={ styles.gridList }>
                        { tilesData.map((tile) => (
                            <Link to={ tile.link }>
                                <GridTile
                                    key={ tile.img }
                                    className="GridTile"
                                    title={ tile.title }
                                    titleBackground={ 'none' }
                                    titleStyle={ styles.title }>
                                    <img src={ tile.img } alt={ "" } />
                                </GridTile>
                            </Link>
                        ))}
                    </GridList>
                </div>
            </div>
        );
    }
}

export default MenuPage;