import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchImagesForProvider } from '../actions/searches';


class SearchElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { searchString: 'red flowers' };
    }

    componentDidMount() {
        //this.doSearch();
    }

    updateSearchValue(event) {
        this.setState({searchString: event.target.value});
    }

    doSearch() {

        this.props.fetchData('pixabay', this.state.searchString);
        this.props.fetchData('flickr', this.state.searchString);
    }

    checkForEnter(event) {
        if (event.keyCode === 13) {
            this.doSearch();
        }
    }

    render() {
        return (
            <div className="SearchBox">
                <div>
                    <input type="text" value={this.state.searchString} onChange={this.updateSearchValue.bind(this)} onKeyDown={this.checkForEnter.bind(this)} />
                </div><button onClick={this.doSearch.bind(this)}>Search</button>
            </div>
        );
    }
}


SearchElement.propTypes = {
    fetchData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (provider, text) => dispatch(fetchImagesForProvider(provider, text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchElement);
