import React from 'react';
import {Col, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';

const propTypes = {
    // Function called when check box is selected/unselected
    onChange: PropTypes.func,
    // Boolean determining if check box is checked
    selected: PropTypes.bool,
}

// Component to render checkBox
function CheckBox(props) {
    return (<Col lg={4}>
        <Form.Check
            type='checkbox'
            className='mt-2'
            id='includeTVShows'
            label='Include TV Shows'
            selected={props.selected}
            onChange={props.onChange}
        />
    </Col>)
}

CheckBox.propTypes = propTypes;

export default (CheckBox)