import { useState, useEffect } from 'react';
import Api from '../Api/Api_query';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

const STATUS = {
  pending: 'pending',
  loading: 'loading',
};

export const App = () => {
  const [pages, setPages] = useState(0);
  const [searchImages, setSearchImages] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(STATUS.pending);
  const [totalImages, setTotalImages] = useState(0);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setSearchImages([]);
  }, [search]);

  const api_searching = (search, pages) => {
    Api.serching(search, pages)
      .then(response => {
        return response.data;
      })
      .then(({ hits, totalHits }) => {
        setTotalImages(totalHits);
        hits.map(el => {
          let articles = {
            id: el.id,
            tag: el.tags,
            largeImageURL: el.largeImageURL,
            webformatURL: el.webformatURL,
          };
          return setSearchImages(prevState => [...prevState, articles]);
        });
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(STATUS.pending);
      });
  };

  const onSubmitHandler = ({ newSearch, search, pages }) => {
    setPages(pages);
    setSearch(search);
    if (newSearch === true) {
      setIsLoading(STATUS.loading);
      api_searching(search, pages);
    }
  };

  const handleClick = largeImage => {
    setModal(largeImage);
  };
  const closeModal = () => {
    setModal(null);
  };

  const onloadMoreImages = () => {
    let nextPage = pages;
    nextPage += 1;
    setPages(nextPage);
    setIsLoading(STATUS.loading);
    try {
      api_searching(search, nextPage);
    } catch (error) {
      console.error('ERROR....', error);
    }
  };

  const currentImages = pages * 12;
  const isMoreImages = pages > 0 && pages * 12 < totalImages;
  return (
    <div>
      <Searchbar onSubmit={onSubmitHandler} />
      <ImageGallery
        images={searchImages}
        status={isLoading}
        totalHits={totalImages}
        currentImages={currentImages}
        isMoreImages={isMoreImages}
        onClick={handleClick}
        loadMoreImages={onloadMoreImages}
      />
      {modal ? <Modal options={modal} closeModal={closeModal} /> : ''}
    </div>
  );
};
