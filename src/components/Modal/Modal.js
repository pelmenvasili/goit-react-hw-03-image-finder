import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { selectedImage } = this.props;
    return (
      <>
        <div className={css.overlay} onClick={this.handleClickOverlay}>
          <div className={css.modal}>
            <img
              src={selectedImage}
              alt={selectedImage}
              className={css.modalImage}
            />
          </div>
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
