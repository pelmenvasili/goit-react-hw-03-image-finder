import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImageURL, onImageClick, id }) => (
  <li className={css.galleryItem} key={id} id={id}>
    <img
      src={src}
      alt={alt}
      className={css.galleryImage}
      onClick={() => onImageClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
export default ImageGalleryItem;
