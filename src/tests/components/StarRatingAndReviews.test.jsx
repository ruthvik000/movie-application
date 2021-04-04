import React from 'react';
import {render} from '@testing-library/react';
import StarRatingAndReviews from '../../components/StarRatingAndReviews';


it('renders star rating component', () => {
    const result = render(<StarRatingAndReviews/>);
    expect(result).toMatchSnapshot();
});

it('renders star rating component with rating 3 and voteCount 45', () => {
    const result = render(<StarRatingAndReviews starRating={6} voteCount={45}/>);
    expect(result).toMatchSnapshot();
});

it('renders star rating component with rating 0 and voteCount 1', () => {
    const result = render(<StarRatingAndReviews starRating={0} voteCount={1}/>);
    expect(result).toMatchSnapshot();
});