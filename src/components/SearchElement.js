import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchImagesForProvider } from '../actions/searches';


class SearchElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { searchString: 'red flowers' };
    }

    handleScroll() {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            this.doSearch(this.props.page + 1);
        }
        else {
            //console.log('not at bottom');
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }


    updateSearchValue(event) {
        this.setState({searchString: event.target.value});
    }

    doSearch(page) {
        this.props.fetchData('pixabay', this.state.searchString, page);
        this.props.fetchData('flickr', this.state.searchString, page);
    }

    checkForEnter(event) {
        if (event.keyCode === 13) {
            this.doSearch(0);
        }
    }

    render() {
        return (
            <div className="SearchBox">
                <div>
                    <input type="text" value={this.state.searchString} onChange={this.updateSearchValue.bind(this)} onKeyDown={this.checkForEnter.bind(this)} />
                </div><button onClick={this.doSearch.bind(this, 0)}>Search</button>
            </div>
        );
    }
}


SearchElement.propTypes = {
    fetchData: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    return {
        page: state.imageResults.page
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (provider, text, page) => dispatch(fetchImagesForProvider(provider, text, page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchElement);
