import React from 'react';
import {render} from '@testing-library/react';
import SearchField from '../../components/SearchField';

let onChangeMock = jest.fn();

it('renders search field', () => {
    const result = render(<SearchField/>);
    expect(result).toMatchSnapshot();
});

it('renders search field with selected true with movie or tv shows placeholder', () => {
    const result = render(<SearchField selected onChange={onChangeMock}/>);
    expect(result).toMatchSnapshot();
});

it('renders search field with selected false with movie placeholder', () => {
    const result = render(<SearchField selected={false} onChange={onChangeMock}/>);
    expect(result).toMatchSnapshot();
});