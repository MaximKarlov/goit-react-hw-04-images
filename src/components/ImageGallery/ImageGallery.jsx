import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { LoadMore } from '../Button/Button';
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem';
import Notiflix from 'notiflix';
import ImageCss from './Image.module.css';

export const ImageGallery = ({ images, onClick, status, isMoreImages, loadMoreImages, totalHits, currentImages, endPages }) => (
  <>
    {images.length > 0 && (
      <ul className={ImageCss.gallery}>
        {images.map(({ id, largeImageURL, tag, webformatURL }) => (
          <ImageGalleryItem largeImage={largeImageURL} id={id} key={webformatURL} tags={tag} webFormat={webformatURL} onClick={onClick} />
        ))}
      </ul>
    )}
    {status === 'loading' ? <Loader /> : isMoreImages === true ? <LoadMore onClick={loadMoreImages} /> : ''}
    {endPages && Notiflix.Notify.warning('Це остання сторінка')};
  </>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
