import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
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
        };

        this.radioGroup = null;
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
        const {projectList, open, classes} = this.props;

        return (
            <Dialog onClose={ this.handleClose } aria-labelledby="simple-dialog-title" open={ open }>
                <DialogTitle disableTypography={true} className={classes.title} id="project-select_dialogue">Choose a
                    project you want to work on:</DialogTitle>
                <div>
                    <FormControl component="fieldset" required className={ classes.formControl }>
                        <RadioGroup ref={ (node) => this.radioGroup = node }
                                    name="projects"
                                    className={ classes.radioGroup }
                                    value={ this.state.selectedValue }
                                    onChange={ (event, value) => this.handleItemClick(value) }>
                            {
                                projectList.map(
                                    project => (
                                        <FormControlLabel className={ classes.radioItem }
                                                          value={ project }
                                                          key={ project }
                                                          control={ <Radio />}
                                                          label={ project }/>)
                                )
                            }
                        </RadioGroup>
                        { this.state.showError && <FormHelperText className={ classes.errorHint }>You need to select a project!</FormHelperText> }
                    </FormControl>
                </div>
            </Dialog>
        );
    }


}

ProjectSelectDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

const style = theme => ({
    formControl: {
        width: '100%',
        paddingBottom: 40,
    },
    title: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 20,
        borderBottom: '1px solid #c0c0c0',
        color: '#121213',
    },
    radioItem: {
        paddingLeft: 25,
        marginRight: 0,
        color: '#ffffff',
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        }
    },
    errorHint: {
        fontFamily: 'Roboto, sans-serif',
        color: '#ff0000',
        fontSize: 13,
        paddingLeft: 30,
        paddingBottom: 10,
        position: 'absolute',
    }
});

export default withStyles(style)(ProjectSelectDialog);