import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setProject } from '../actions';

class ProjectSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: this.props.projectName,
        };
    }

    render() {
        const { projectName } = this.props;
        const projects = ['testproject', 'kundenfu'];

        return (
            <SelectField
                className={ 'project-select' }
                underlineStyle={{ color: '#aaccee' }}
                style={{ paddingLeft: 20 }}
                value={ this.state.input }
                onChange={ this.handleChange }
                maxHeight={ 200 }>
                { projects.map(project => <MenuItem value={ project } key={ project } primaryText={`${ project }`} />)}
            </SelectField>
        );
    };

    handleChange = (event, index, value) => {
        this.setState({ input: value });
        this.props.dispatch(setProject(value));
    };
}

ProjectSelect.PropTypes = {
    projectName: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        projectName: state.projectName,
    };
};

export default connect(mapStateToProps)(ProjectSelect);