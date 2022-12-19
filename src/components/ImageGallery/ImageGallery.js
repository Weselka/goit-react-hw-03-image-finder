import { Component } from 'react';
import { ImageGalleryItem, LoadMore } from 'components';
import { ImageGalleryList } from './ImageGallery.styled';
import { fetchImages } from '../../services/Images-api';
import { Modal } from 'components';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    status: 'idle',
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({
        page: 1,
        images: [],
        status: 'idle',
      });
      // window.scroll(0, 0);
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      try {
        this.setState({ status: 'pending' });
        const {
          hits,
          total,
          totalHits,
          // page: currentPage,
        } = await fetchImages(nextName, nextPage);
        if (hits.length === 0) {
          this.setState({ status: 'idle' });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          total: total,
          totalHits: totalHits,
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  btnLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, status, totalHits } = this.state;

    if (status === 'idle') {
      return <h2>Add a photo to view or enter another name</h2>;
    }
    if (status === 'pending') {
      return <h1>Download</h1>;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <ImageGalleryList onClick={this.toggleModal}>
          <ImageGalleryItem images={images} onClick={this.btnLoadMore} />
          {images.length < totalHits && <LoadMore onClick={this.btnLoadMore} />}
          {/* {this.state.showModal && <Modal></Modal>} */}
        </ImageGalleryList>
      );
    }
  }
}
