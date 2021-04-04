import '../assets/MovieApplication.css';
import React from 'react';
import {Row, Container, Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchField from './SearchField';
import CheckBox from './CheckBox';
import SearchResults from './SearchResults';
import Constants from '../Constants';

// Component to Render the Application Landing Page
function MovieApplication() {
    const MOVIE_APPLICATION_NAME = '🎥 Movie Search Application';
    const MOVIE_AND_TV_SHOW_APPLICATION_NAME = '🎥 Movie and TV Show Search Application';
    const [input, setInput] = React.useState('');
    const [error, setError] = React.useState(false);
    const [requestNextPage, setRequestNextPage] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [totalResults, setTotalResults] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(Constants.PAGE_NUMBER);
    const [pathParam, setPathParam] = React.useState(Constants.MOVIE_PATH_PARAM);
    const [selected, setSelected] = React.useState(false);

    const prevPageNumber = usePreviousPageNumber(pageNumber);
    const prevCheckBoxValue = usePreviousCheckBoxValue(selected);

    const applicationName = pathParam === Constants.MOVIE_PATH_PARAM ?
        MOVIE_APPLICATION_NAME : MOVIE_AND_TV_SHOW_APPLICATION_NAME

    // onscroll is used to determine the position to scroller to
    // load next page details with loading indicator
    window.onscroll = function () {
        if (input !== '' && prevPageNumber === pageNumber &&
            window.innerHeight + document.documentElement.scrollTop >
            document.documentElement.offsetHeight - 100) {
            setRequestNextPage(true);
            setTimeout(function () {
                setRequestNextPage(false);
                setPageNumber(pageNumber + 1);
            }, 1000);
        }
    }

    const onChange = (e) => {
        setPageNumber(Constants.PAGE_NUMBER);
        setInput(e.target.value);
        if (e.target.value === '') {
            setItems([]);
        }
    }

    // Function to keep track if check box is selected or not
    function usePreviousCheckBoxValue(value) {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        })
        return ref.current;
    }

    // onChange used to flex the set the pathParam to flex API calls
    const onChangeCheckBox = () => {
        if (prevCheckBoxValue) {
            setSelected(false);
            setItems([]);
            setPathParam(Constants.MOVIE_PATH_PARAM);
        } else {
            setSelected(true);
            setItems([]);
            setPathParam(Constants.MOVIE_AND_TV_PATH_PARAM);
        }
    }

    // Function to keep track of Previous Page Number
    function usePreviousPageNumber(value) {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        })
        return ref.current;
    }

    React.useEffect(() => {
        // Added this check is to not call the API when initially loading the application
        if (input !== '') {
            axios.get(`https://api.themoviedb.org/3/search/${pathParam}?api_key=${Constants.API_KEY}&query=${input}&page=${pageNumber}`)
                .then(
                    (result) => {
                        if (result.status !== 200) {
                            setError(true)
                        } else if (prevPageNumber !== pageNumber) {
                            setItems([...new Set([...items, ...result.data.results])])
                        } else {
                            setItems([...new Set(result.data.results)]);
                            setTotalResults(result.data.total_results)
                        }
                    },
                ).catch(() =>
                setError(true))
        }
    }, [input, pageNumber, pathParam])

    const alert =
        error ?
            <div className="alert alert-danger alert-dismissible">
                We were unable to complete search at this time. Please try later!
            </div> : null

    return (
        <div className='MovieApplication'>
            <Container className='p-3'>
                <Jumbotron>
                    <h1 className='text-center mb-4'>{applicationName}</h1>
                    <Container fluid className="">
                        <Row>
                            <SearchField
                                selected={selected}
                                onChange={onChange}
                            />
                            <CheckBox
                                selected={selected}
                                onChange={onChangeCheckBox}
                            />
                        </Row>
                    </Container>
                </Jumbotron>
            </Container>
            <Container>
                {alert}
                <SearchResults
                    items={items}
                    selected={selected}
                    input={input}
                    requestNextPage={requestNextPage}
                    pageNumber={pageNumber}
                    error={error}
                    totalResults={totalResults}
                />
            </Container>

        </div>
    );
}

export default MovieApplication;
