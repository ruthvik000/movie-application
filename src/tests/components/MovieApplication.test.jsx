import React from "react";
import {cleanup, render} from '@testing-library/react';
import axios from 'axios';
import MovieApplication from '../../components/MovieApplication';

const results = [
    {
        poster_path: 'xyz',
        original_title: 'Movie 1',
        overview: 'This movie is a action movie',
        vote_count: 61,
        release_date: '2020-12-31',
        vote_average: 6.7
    },
    {
        poster_path: 'xyza',
        original_title: 'Movie 2',
        overview: 'This movie is a Drama & Action movie',
        vote_count: 10,
        vote_average: 4
    },
]

beforeEach(() => {
    window.onscroll = jest.fn();
});


afterEach(() => {
    cleanup();
});

it('renders Movie application with input field with movie placeholder', () => {
    const result = render(<MovieApplication/>);
    expect(result).toMatchSnapshot();
});

it('renders Movie application with input field with movie and TV placeholder', () => {
    jest.spyOn(React, 'useState')
        .mockReturnValueOnce(['Movie', {}])
        .mockReturnValueOnce([false, {}])
        .mockReturnValueOnce([false, {}])
        .mockReturnValueOnce([results, {}])
        .mockReturnValueOnce([0, {}])
        .mockReturnValueOnce([1, {}])
        .mockReturnValueOnce(['multi', {}])
        .mockReturnValueOnce([true, {}])

    axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: results}))

    const result = render(<MovieApplication/>);
    expect(result).toMatchSnapshot();
});

it('renders Alert Banner', () => {
    jest.spyOn(React, 'useState')
        .mockReturnValueOnce(['', {}])
        .mockReturnValueOnce([true, {}])
        .mockReturnValueOnce([false, {}])
        .mockReturnValueOnce([[], {}])
        .mockReturnValueOnce([0, {}])
        .mockReturnValueOnce([1, {}])
        .mockReturnValueOnce(['multi', {}])
        .mockReturnValueOnce([true, {}])

    const result = render(<MovieApplication/>);
    expect(result).toMatchSnapshot();
});

it('renders Movie application with search results', () => {
    jest.spyOn(React, 'useState')
        .mockReturnValueOnce(['a', {}])
        .mockReturnValueOnce([false, {}])
        .mockReturnValueOnce([false, {}])
        .mockReturnValueOnce([[], {}])
        .mockReturnValueOnce([0, {}])
        .mockReturnValueOnce([1, {}])
        .mockReturnValueOnce(['multi', {}])
        .mockReturnValueOnce([true, {}])

    axios.get = jest.fn(() => Promise.resolve({status: 200}, {data: results}))

    const result = render(<MovieApplication/>);
    expect(result).toMatchSnapshot();
});
