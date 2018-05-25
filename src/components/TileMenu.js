import React from 'react';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import {withStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import * as theme from "material-ui";
import withTheme from "@material-ui/core/es/styles/withTheme";

const TileMenu = ({tileData, cols, rows, classes}) => {

    const styles = {
        root: {
            display: 'flex',
            flexWrap: 'space-between',
            justifyContent: 'center',
            paddingTop: 20,
        },
        gridList: {
            overflowY: 'auto',
            maxWidth: 450,
            maxHeight: 370,
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ea7400',
            textAlign: 'center',
            marginLeft: 0,
        }
    };

    const foo = (<span></span>);

    return (
        <div className="gridList" style={ styles.root }>
            <GridList
                className="GridList"
                cols={ cols }
                rows={ rows }
                cellHeight={ 180 }
                style={ styles.gridList }>
                { tileData.map((tile) => (
                    <Link to={ tile.link } key={ tile.link }>
                        <GridTile
                            key={ tile.img }
                            className="GridTile"
                            title={ tile.title }
                            titleBackground={ 'none' }
                            titleStyle={ styles.title }>
                            {
                                !!tile.count && <Badge className={ classes.todoBadge }
                                                       badgeContent={ tile.count }
                                                       children={ foo }
                                                       color={ "primary" } />
                            }
                            <img src={ tile.img } alt={ "" }/>
                        </GridTile>
                    </Link>
                ))}
            </GridList>
        </div>
    );
};


const styles = theme => ({
    todoBadge: {
        color: theme.palette.primary,
        backgroundColor: theme.palette.primary,
        position: 'absolute',
        top: 25,
        right: 23,
    },
});

export default withTheme()(withStyles(styles)(TileMenu));