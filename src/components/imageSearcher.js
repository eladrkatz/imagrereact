import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchElement from './searchElement';
import HistoryElement from './history';
import ImageResults from './imageResults';

class ImageSearcher extends Component {

    handleScroll() {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            console.log('BOTTOM!');
        }
        else {
            console.log('not at bottom');
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

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
