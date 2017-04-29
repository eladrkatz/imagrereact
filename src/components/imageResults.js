import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ImageResults extends Component {

    render() {
        return (
            <div>
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
