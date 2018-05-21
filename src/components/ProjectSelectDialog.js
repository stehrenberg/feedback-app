import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class ProjectSelectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            selectedValue: "",
        }
    }

    handleClose = () => {
        this.props.onClose(this.state.selectedValue);
    };

    handleItemClick = (value) => {
        this.props.onClose(value);
    };

    render() {
        const { projectList, open } = this.props;
        console.log(this.props);

        return (
                <Dialog onClose={ this.handleClose } aria-labelledby="simple-dialog-title" open={ open }>
                    <DialogTitle id="project-select_dialogue">Choose a project you want to work on:</DialogTitle>
                    <div>
                        <List>
                            {
                                projectList.map(
                                    project => (
                                        <ListItem button onClick={ () => this.handleItemClick(project) } key={ project } >
                                            <ListItemText primary={ project }/>
                                        </ListItem>
                                    ))
                            }
                        </List>
                    </div>
                </Dialog>
        );
    }


}

ProjectSelectDialog.propTypes = {};

export default withStyles({})(ProjectSelectDialog);