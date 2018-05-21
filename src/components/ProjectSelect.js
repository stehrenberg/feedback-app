import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setProject } from '../actions';

class ProjectSelect extends React.Component {

    render() {
        const { projects } = this.props;

        return (
            <SelectField
                className={ 'ProjectSelect' }
                labelStyle={{ color: '#ffffff', fontSize: 20 }}
                style={{ paddingLeft: 20, width: 200, top: 10 }}
                underlineStyle={{ color: '#ff00ff' }}
                value={ this.props.projectName }
                onChange={ this.handleChange }
                maxHeight={ 200 }>
                { projects.map(project => <MenuItem value={ project } key={ project } primaryText={`${ project }`} />)}
            </SelectField>
        );
    };

    handleChange = (event, index, projectName) => {
        this.props.dispatch(setProject(projectName));
    };
}

ProjectSelect.propTypes = {
    projectName: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => {
    return {
        projectName: state.projectName,
        projects: state.projects,
    };
};

export default connect(mapStateToProps)(ProjectSelect);