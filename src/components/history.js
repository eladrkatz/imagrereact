import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchImagesForProvider } from '../actions/searches';
import { clearHistory } from '../actions/history';

class HistoryElement extends Component {

    goToHistory(item) {
        this.props.fetchData('pixabay', item.term, 0);
        this.props.fetchData('flickr', item.term, 0);
    }

    clearHistory() {
        this.props.clearHistory();
    }

    render() {
        return (
            <div>
            { this.props.historyCache.length !== 0 &&
            <div className="HistoryBox">
                <span>&nbsp;&nbsp;&nbsp;Last Searches:</span>
                <div style={{ marginTop: '10px'}}>
                    {this.props.historyCache.map((item) => (
                        <div key={item.id} onClick={() => this.goToHistory(item)}>
                            {item.term}
                        </div>
                    ))}
                </div>
                    <button onClick={this.clearHistory.bind(this)} style={{float: 'right'}}>Clear</button>
            </div>
            }
            </div>
        );
    }
}


HistoryElement.propTypes = {
    historyCache: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
    clearHistory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        historyCache: state.historyCache
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (provider, text, page) => dispatch(fetchImagesForProvider(provider, text, page)),
        clearHistory: () => dispatch(clearHistory())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryElement);
