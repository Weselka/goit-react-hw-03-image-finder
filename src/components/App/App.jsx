import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../services/Images-api';

import { Container, Searchbar, ImageGallery, LoadMore } from 'components';


export class App extends Component {
  state = {
    imagesName: '',
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imagesName;
    const nextName = this.state.imagesName;
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

  handleSearchFormSubmit = imagesName => {
    this.setState({ imagesName });
  };

  btnLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, totalHits } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <h2>Add a photo to view or enter another name</h2>
          <ToastContainer autoClose={3000} />
        </>
      );
    }
    if (status === 'pending') {
      return <h1>Download</h1>;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <Container>
            <ImageGallery imagesName={this.state.imagesName} images={images} />
          </Container>
          {images.length < totalHits && <LoadMore onClick={this.btnLoadMore} />}
          <ToastContainer autoClose={3000} />
        </>
      );
    }
  }
}
