import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchElement from './searchElement';
import HistoryElement from './history';
import ImageResults from './imageResults';

class ImageSearcher extends Component {

    render() {
        return (
        <div className='main'>
            <SearchElement />
            <HistoryElement />
            <ImageResults />
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSearcher);
