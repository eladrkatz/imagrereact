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

        this.props.fetchData(this.state.searchString);
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
                        <td>{item.type}</td>
                        <td><img src={item.src} height="99"/></td>
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
