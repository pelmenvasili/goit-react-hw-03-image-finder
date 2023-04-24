import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import css from './App.module.css';

const API_KEY = '34204317-8ae92d59a6bb5fdb3cbc534ec';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    isModalOpen: false,
    selectedImage: '',
    backgroundColor: '',
    noResults: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (searchQuery.trim() !== "" && prevState.searchQuery !== searchQuery) {
    this.fetchImages();
    }
  }
  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      noResults: false,
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true, backgroundColor: '#155076' });

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ noResults: true });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            currentPage: prevState.currentPage + 1,
          }));
        }
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  onSelectImage = image => {
    this.setState({
      selectedImage: image,
      isModalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const {
      images,
      isLoading,
      isModalOpen,
      selectedImage,
      backgroundColor,
      noResults,
    } = this.state;
     const shouldRenderLoadMoreButton =
    images.length > 0;

    return (
      <div className={css.App} style={{ backgroundColor }}>
        <Searchbar onSubmit={this.onChangeQuery} />
        {noResults ? (
          <p className={css.noResultsMessage}>
            No results found for your query
          </p>
        ) : (
          <ImageGallery images={images} onImageClick={this.onSelectImage} />
        )}

        {isLoading && <Loader />}

        {shouldRenderLoadMoreButton && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}

        {isModalOpen && (
          <Modal onClose={this.toggleModal} selectedImage={selectedImage}>
            <img
              src={selectedImage}
              alt={selectedImage}
              onClick={this.toggleModal}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
