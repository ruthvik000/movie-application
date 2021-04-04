import React from 'react';
import PropTypes from 'prop-types';
import {Col, Form} from 'react-bootstrap';

const propTypes = {
    // Function called when there is a change in search field
    onChange: PropTypes.func,
    // Boolean determining if check box is checked
    selected: PropTypes.bool,
}

const MOVIE_PLACEHOLDER = 'Enter the movie name here...';
const MOVIE_AND_TV_SHOW_PLACEHOLDER = 'Enter the movie or TV show name here...'

// Component to render the searchField
function SearchField(props) {
    const placeHolder = props.selected ? MOVIE_AND_TV_SHOW_PLACEHOLDER : MOVIE_PLACEHOLDER;
    return (
        <Col lg={8}>
            <Form.Control
                className='mb-2'
                id='searchInput'
                placeholder={placeHolder}
                size="lg"
                onChange={props.onChange}/>
        </Col>)
}

SearchField.propTypes = propTypes;

export default (SearchField)