import React from 'react';
import {render} from '@testing-library/react';
import SearchResults from '../../components/SearchResults';

const items = [
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
    }
]

const itemsSelected = [
    {
        poster_path: 'xyz',
        original_title: 'Movie 1',
        overview: 'This movie is a action movie',
        release_date: '2020-12-31',
        vote_count: 61,
        vote_average: 6.7
    },
    {
        poster_path: 'xyza',
        original_title: 'Movie 2',
        overview: 'This movie is a Drama & Action movie',
        vote_count: 10,
        vote_average: 4
    },
    {
        poster_path: 'xyzb',
        original_title: 'TV Show 1',
        overview: 'This movie is a Drama & Action movie',
        first_air_date: '1991-12-31',
        vote_count: 5400,
        vote_average: 7.8
    }
]

it('renders empty div input string is empty', () => {
    const result = render(
        <SearchResults
            input=''
            items={[]}
        />);
    expect(result).toMatchSnapshot();
});

it('renders search results for input string with selected false', () => {
    const result = render(
        <SearchResults
            input='sa'
            items={items}
            selected={false}
        />);
    expect(result).toMatchSnapshot();
});

it('renders search results for input string with selected true', () => {
    const result = render(
        <SearchResults
            input='sa'
            items={itemsSelected}
            selected
        />);
    expect(result).toMatchSnapshot();
});

it('renders loading indicator', () => {
    const result = render(
        <SearchResults
            input='sa'
            items={itemsSelected}
            selected
            requestNextPage
        />);
    expect(result).toMatchSnapshot();
});

it('renders end of page and jump to top when all items are retrieved', () => {
    const result = render(
        <SearchResults
            input='sa'
            items={itemsSelected}
            selected
            totalResults={3}
        />);
    expect(result).toMatchSnapshot();
});

it('renders empty div when error is present', () => {
    const result = render(
        <SearchResults
            input='sa'
            items={itemsSelected}
            selected
            error
            totalResults={3}
        />);
    expect(result).toMatchSnapshot();
});