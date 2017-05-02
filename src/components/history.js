import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { imagesFetchData } from '../actions/searches';
import { clearHistory } from '../actions/searches';

class HistoryElement extends Component {

    goToHistory(item) {
        this.props.fetchData(item.term);
    }

    clearHistory() {
        this.props.clearHistory();
    }

    render() {
        return (
            <div className="HistoryBox">
                <span>&nbsp;&nbsp;&nbsp;Last Searches:</span>
                <div style={{ marginTop: '10px'}}>
                    {this.props.historyCache.map((item) => (
                        <div key={item.id} onClick={() => this.goToHistory(item)}>
                            {item.term}
                        </div>
                    ))}
                </div>
                { this.props.historyCache.length !== 0 &&
                    <button onClick={this.clearHistory.bind(this)} style={{float: 'right'}}>Clear</button>
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
        fetchData: (url) => dispatch(imagesFetchData(url, false)),
        clearHistory: () => dispatch(clearHistory())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryElement);
