import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';

function TileMenu({ tileData }) {

    const styles = {
        root: {
            display: 'flex',
            flexWrap: 'space-between',
            justifyContent: 'center',
            paddingTop: 60,
        },
        gridList: {
            width: 580,
            height: 370,
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

    return <div className="gridList" style={ styles.root }>
        <GridList
            className="GridList"
            cols={ 3 }
            rows={ 2 }
            cellHeight={ 180 }
            style={ styles.gridList }>
            { tileData.map((tile) => (
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
    </div>;
}

export default TileMenu;