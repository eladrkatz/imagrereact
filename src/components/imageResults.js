import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ImageResults extends Component {

    render() {
        return (
            <div>
                <div style={{marginLeft: '212px', display: 'inline-block', width: '40%', verticalAlign: 'top'}} >
                    <div className="ResultBox">
                    { this.props.images.length !== 0 &&
                    <div>
                        Flickr Results:
                    </div>
                    }
                        {this.props.images.map((item) => (
                            <div key={item.id} className="ImageResult">
                                <div>
                                    <img src={item.src} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top'}} >
                    <div className="ResultBox">
                    { this.props.images2.length !== 0 &&
                    <div>
                        Pixabay Results:
                    </div>
                    }
                        {this.props.images2.map((item) => (
                            <div key={item.id} className="ImageResult">
                                <div>
                                    <img src={item.src} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


ImageResults.propTypes = {
    images: PropTypes.array.isRequired,
    images2: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        images: state.imageResults.flickr.imageResults,
        images2: state.imageResults.pixabay.imageResults
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageResults);
