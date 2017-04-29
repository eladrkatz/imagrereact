import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { imagesFetchData } from '../actions/searches';


class SearchElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { searchString: '' };
    }
    componentDidMount() {
    }

    updateSearchValue(event) {
        this.setState({searchString: event.target.value});
    }

    doSearch() {

        //let url = `https://pixabay.com/api/?key=5237003-df8ec7ded9cea8b1e96684130&q=${this.state.searchString}&image_type=photo&pretty=true`;

        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2f70f1a0e94575ba10c9dda701454c42&text=${this.state.searchString}&format=json&nojsoncallback=1`;

        this.props.fetchData(url);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }


        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={this.updateSearchValue.bind(this)} />
                <button onClick={this.doSearch.bind(this)}>Search Images</button>

            <table>
                <tbody>
                {this.props.images.map((item) => (
                    <tr key={item.id}>
                        {/*<td>{item.tags}</td>*/}
                        <td>{item.title}</td>
                        <td><img src={item.previewURL}/></td>
                        <td><img src={'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'} /> </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        );
    }
}


SearchElement.propTypes = {
    fetchData: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        images: state.imageResults,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(imagesFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchElement);
