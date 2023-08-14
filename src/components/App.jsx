import  { React, useState, useEffect } from 'react';
import { fetchPictures } from 'services/gallery-api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Wrapper } from './Searchbar/Searchbar.styled';
import GlobalStyle from 'globalStyles';

export const App = () => {
 
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loadMore, setLoadMore] = useState(null);

  const getLargeImgUrl = imgUrl => {
    setLargeImageUrl(imgUrl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const searchResult = value => {
    setQuery(value);
    setPage(1);
    setPictures([]);
    setLoadMore(null);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

   useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('loading');
    setLoadMore(null);

    fetchPictures(query, page)
      .then(e => {
        setPictures(prevState => [...prevState, ...e.hits]);
        setStatus('idle');
        setLoadMore(12 - e.hits.length);
      })
      .catch(error => console.log(error));
  }, [page, query]);
  
  return (
     <Wrapper>
      <GlobalStyle />
      <Searchbar onSubmit={searchResult} />
      {showModal && <Modal imgUrl={largeImageUrl} onClose={toggleModal} />}
      <ImageGallery pictures={pictures} onClick={getLargeImgUrl} />
      {status === 'loading' && <Loader />}
      {loadMore === 0 && <Button onClick={handleLoadMore} />}
    </Wrapper>
  );
};
