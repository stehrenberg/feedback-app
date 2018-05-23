import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const CardMessage = ({classes, title, text, show}) => (
        <Slide in={ show } direction="right" mountOnEnter unmountOnExit>
            <Card className={ classes.card }>
                <CardContent>
                    <Typography className={ classes.title } variant="headline" component="h2">
                        <p>{ title }</p>
                    </Typography>
                    <Typography className={ classes.text } color="textSecondary">
                        { text }
                    </Typography>
                </CardContent>
            </Card>
        </Slide>
);

const styles = {
    card: {
        zIndex: 10,
        width: 230,
        position: 'absolute',
        top: 250,
        left: 20,
        padding: 5,
        marginTop: -10,
        marginBottom: 20,
    },
    text: {
        marginBottom: 5,
        fontSize: 14,
    },
    title: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
        color: '#ea7400'
    },
};

export default withStyles(styles)(CardMessage);