import React from 'react';
import ReactDOM from 'react-dom';
import StorageMock from '../util/StorageMock';
import Question from './Question';

it('renders without crashing', () => {
    window.localStorage = StorageMock();
    const div = document.createElement('div');
    ReactDOM.render(<Question />, div);
});
