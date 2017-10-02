import React from 'react';
import ReactDOM from 'react-dom';
import StorageMock from '../util/StorageMock';
import Question from './Question';

it('renders without crashing', () => {

    const dummyProps = {
        name: 'bla',
        surveyId: '20171010-testproject',
        inputType: 'number',
        isReadOnly: false,
        onChange: () => {},
        value: '',
        placeholder: 'bla',
    };

    window.localStorage = StorageMock();
    const div = document.createElement('div');
    ReactDOM.render(<Question {...dummyProps}/>, div);
});
