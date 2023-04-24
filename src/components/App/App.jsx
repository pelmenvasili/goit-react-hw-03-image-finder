import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import {getImages} from "../../Services/services"
import css from './App.module.css';


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
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, currentPage} = this.state;

    if (searchQuery.trim() !== "" && prevState.searchQuery !== searchQuery) {
    this.fetchImages(searchQuery, currentPage);
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

 fetchImages = async () => {
   try {
    const { searchQuery, currentPage } = this.state;
    this.setState({ isLoading: true, backgroundColor: '#155076' });
    const data = await getImages(searchQuery, currentPage);
    if (data.hits.length === 0) {
      this.setState({ noResults: true });
    } else {
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        currentPage: prevState.currentPage + 1,
        total: data.totalHits,
      }));
    }
  } catch (error) {
    alert(error);
  } finally {
    this.setState({ isLoading: false });
  }
}

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
      total,
    } = this.state;

    const totalPage = total / images.length;
    const shouldRenderLoadMoreButton = totalPage > 1 && images.length > 0 && !isLoading  & !noResults;

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

        {shouldRenderLoadMoreButton && (
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
