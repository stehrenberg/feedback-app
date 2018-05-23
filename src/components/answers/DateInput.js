import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Moment from 'moment';
import PropTypes from 'prop-types';
import {profile} from '../../config/profile';

const DateInput = ({name, value, handleChange, isReadOnly}) => {

    const optionalProps = isReadOnly ? {disabled: true, hintText: value} : {hintText: "Pick a date"};
    const dateSuggestion = new Date(Moment().add(profile.feedbackIntervallInWeeks, 'weeks'));

    return (
        <DatePicker
            id={ name }
            value={ !(!value) ? new Date(value) : dateSuggestion }
            onChange={ handleChange }
            {...optionalProps}/>
    );
};

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
};

export default DateInput;