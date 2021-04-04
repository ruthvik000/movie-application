import React from 'react';
import PropTypes from 'prop-types';
import PrettyRating from 'pretty-rating-react'

const propTypes = {
    // The star rating for a movie or tv show
    starRating: PropTypes.number,
    // The total votes for a movie or tv show
    voteCount: PropTypes.number,
}
const REVIEWS = 'reviews';

const colors = {
    // [0] for complete icon, [1] for half icon, [2] for empty icon
    star: ['#d9ad26', '#d9ad26', '#434b4d'],
};

// Component to render ratings and reviews.
function StarRatingAndReviews(props) {
    const rating = props.starRating / 2;
    return (
        <div>
            <PrettyRating value={rating} colors={colors.star}/>
            <label>&nbsp;<span className='vote-count'>{props.voteCount + ' ' + REVIEWS}</span>
            </label>
        </div>)
}

StarRatingAndReviews.propTypes = propTypes;

export default (StarRatingAndReviews)