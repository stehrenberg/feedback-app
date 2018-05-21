import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class ProjectSelectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: "",
            showError: false,
        }
    }

    handleClose = () => {
        this.setState({
            showError: true
        });
    };

    handleItemClick = (value) => {
        this.props.onClose(value);
    };

    render() {
        const { projectList, open, classes } = this.props;

        return (
                <Dialog onClose={ this.handleClose } aria-labelledby="simple-dialog-title" open={ open }>
                    <DialogTitle disableTypography={true} className={classes.title} id="project-select_dialogue">Choose a project you want to work on:</DialogTitle>
                    { this.state.showError && <p className="error-hint">You need to select a project</p> }
                    <div>
                        <List>
                            {
                                projectList.map(
                                    project => (
                                        <ListItem button className={classes.listItem} onClick={ () => this.handleItemClick(project) } key={ project } >
                                            <ListItemText disableTypography={true} primary={ project }/>
                                        </ListItem>
                                    ))
                            }
                        </List>
                    </div>
                </Dialog>
        );
    }


}

ProjectSelectDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

const style = {
    title: {
        fontSize: 18,
        fontFamily: 'Roboto, sans-serif',
        paddingBottom: 27,
        borderBottom: '1px solid #c0c0c0',
        color: '#121213',
    },
    listItem: {
        color: '#515152',
        "&:hover": {
            color: '#00BCD4'
        }
    }
};

export default withStyles(style)(ProjectSelectDialog);