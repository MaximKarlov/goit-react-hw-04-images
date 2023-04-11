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
  const [newSearch, setNewSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(STATUS.pending);
  const [loadMore, setLoadMore] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (newSearch === true) {
      setSearchImages([]);
      setIsLoading(STATUS.loading);
      api_searching(search, pages);
    }
  }, [newSearch, pages, search]);

  useEffect(() => {
    if (searchImages.length > 0 && loadMore === true) api_searching(search, pages);
  }, [loadMore, pages, search, searchImages.length]);

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
        setLoadMore(false);
      });
  };

  const onSubmitHandler = ({ newSearch, search, pages }) => {
    setPages(pages);
    setSearch(search);
    setNewSearch(newSearch);
  };

  const handleClick = largeImage => {
    setModal(largeImage);
  };
  const closeModal = () => {
    setModal(null);
  };

  const onloadMoreImages = () => {
    setNewSearch(false);
    setLoadMore(true);
    let nextPage = pages;
    nextPage += 1;
    setPages(nextPage);
    setIsLoading(STATUS.loading);
  };

  const currentImages = pages * 12;
  const isMoreImages = pages > 0 && pages * 12 < totalImages;
  console.log('currentImages> totalImages', currentImages > totalImages);
  let endPage = currentImages > totalImages && totalImages > 0;
  console.log(endPage);
  return (
    <div>
      <Searchbar onSubmit={onSubmitHandler} />
      <ImageGallery
        images={searchImages}
        status={isLoading}
        totalHits={totalImages}
        endPages={endPage}
        currentImages={currentImages}
        isMoreImages={isMoreImages}
        onClick={handleClick}
        loadMoreImages={onloadMoreImages}
      />
      {modal ? <Modal options={modal} closeModal={closeModal} /> : ''}
    </div>
  );
};
