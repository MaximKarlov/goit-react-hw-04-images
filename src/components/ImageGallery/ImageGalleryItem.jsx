import PropTypes from 'prop-types';
import ImageCss from './Image.module.css';

export const ImageGalleryItem = ({ id, largeImage, tag, webFormat, onClick }) => {
  return (
    <li className={ImageCss.gallery_item} id={id}>
      <img src={webFormat} alt={tag} onClick={() => onClick(largeImage)} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
