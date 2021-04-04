import React from 'react';
import {render} from '@testing-library/react';
import CheckBox from '../../components/CheckBox';

let onChangeMock = jest.fn();

it('renders check box', () => {
    const result = render(<CheckBox/>);
    expect(result).toMatchSnapshot();
});

it('renders check box with selected true', () => {
    const result = render(<CheckBox selected onChange={onChangeMock}/>);
    expect(result).toMatchSnapshot();
});

it('renders check box with selected false', () => {
    const result = render(<CheckBox selected={false} onChange={onChangeMock}/>);
    expect(result).toMatchSnapshot();
});