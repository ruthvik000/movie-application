import React from 'react';
import {Media, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import Constants from '../Constants';
import StarRatingAndReviews from './StarRatingAndReviews';

const propTypes = {
    // Movies and TV shows results array
    items: PropTypes.array,
    // Boolean determining if check box is checked
    selected: PropTypes.bool,
    // Input string entered by user.
    input: PropTypes.string,
    // Boolean determining if next page is requested.
    requestNextPage: PropTypes.bool,
    // Total number of results returned for search terms.
    totalResults: PropTypes.number,
    error: PropTypes.bool,
}

const MOVIE = 'movie'
const DEFAULT_SEARCH_RESULT_STRING_FOR_MOVIES_AND_TV_SHOWS = 'Movie and TV Results for: '
const DEFAULT_SEARCH_RESULT_STRING_FOR_MOVIES = 'Movie Results for: '

// Function to return the release date for Movies and TV shows
const releaseDate = (item, selected) => {
    let date;
    if (selected) {
        if (item && item.media_type === MOVIE) {
            if (item.release_date !== null && item.release_date !== undefined) {
                date = item.release_date.split('-')[0];
            }
        } else if (item.first_air_date !== null && item.first_air_date !== undefined) {
            date = item.first_air_date.split('-')[0];
        }
    } else {
        if (item && item.release_date !== null && item.release_date !== undefined) {
            date = item.release_date.split('-')[0];
        }
    }
    return date;
}

const loadDefaultPoster = (ev) => {
    ev.target.src = '/images/no_poster.jpg';
}

// Function to return the name for Movies and TV shows
const name = (item, selected) => {
    let name;
    if (selected) {
        name = item.media_type === MOVIE ? item.original_title : item.name
    } else {
        name = item.original_title;
    }
    return name;
}

// Component to render search results.
function SearchResults(props) {
    let search_result_heading =
        props.selected ? DEFAULT_SEARCH_RESULT_STRING_FOR_MOVIES_AND_TV_SHOWS +
            props.input : DEFAULT_SEARCH_RESULT_STRING_FOR_MOVIES + props.input;

    const renderResultsHeader = props.error || props.input === '' ?
          null : search_result_heading;

    const loadingIndicator = props.requestNextPage ? (<div className="spinner-border" role="status">
    </div>) : null;

    const footer = (<div>
        <h4 className='mt-5'>End Of Results</h4>
        <a href='#top' className='pb-5'>☝ Jump To Top</a></div>)

    const renderResultsFooter =
        props.items.length > 0 && props.items.length === props.totalResults ? footer : null;
    return (
        <div id='search-results'>
            <h3>{renderResultsHeader}</h3>
            <ul className='list-unstyled'>
                {props.items.map(item => (
                    <Media as='li' className='mt-4 mb-4'>
                        <Image
                            width={133}
                            height={200}
                            className='mr-3'
                            src={Constants.POSTER_PATH + item.poster_path}
                            alt={name(item, props.selected)}
                            onError={loadDefaultPoster}
                            thumbnail
                        />
                        <Media.Body>
                            <h5>{name(item, props.selected)}</h5>
                            <pre>{releaseDate(item, props.selected)}</pre>
                            <p>{decode(item.overview)}</p>
                            <StarRatingAndReviews
                                starRating={item.vote_average}
                                voteCount={item.vote_count}
                            />
                        </Media.Body>
                    </Media>
                ))}
            </ul>
            {loadingIndicator}
            {renderResultsFooter}
        </div>);
}

SearchResults.propTypes = propTypes;

export default (SearchResults)