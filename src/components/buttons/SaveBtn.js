import React from 'react';
import Check from 'material-ui/svg-icons/navigation/check';
import RaisedButton from 'material-ui/RaisedButton';

const SaveBtn = () => (
    <RaisedButton type="submit" label="Save" labelPosition="before" secondary={ true } icon={ <Check /> } />
);

export default SaveBtn;