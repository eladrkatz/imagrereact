import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ImageResults extends Component {

    render() {
        return (
            <div className="ResultBox">
                {this.props.images.map((item) => (
                    <div key={item.id} className="ImageResult">
                        <div>
                            <img src={item.src} />
                        </div>
                        <span>{item.type}</span>
                    </div>
                ))}
            </div>
        );
    }
}


ImageResults.propTypes = {
    images: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        images: state.imageResults
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageResults);
