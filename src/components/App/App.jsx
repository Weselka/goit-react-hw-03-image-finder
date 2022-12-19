import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../services/Images-api';
import { Section } from '../Section/Section.styled'
import { ErrorText, ErrorBox } from '../ImageError/ImageError.styled';
import { Audio } from 'react-loader-spinner';

import {
  Container,
  Searchbar,
  ImageGallery,
  LoadMore,
  ImageError,
} from 'components';


export class App extends Component {
  state = {
    imagesName: '',
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
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
        <Section>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <ErrorBox>
            <ErrorText>Add a photo to view or enter another name</ErrorText>
          </ErrorBox>
          <ToastContainer autoClose={3000} />
        </Section>
      );
    }
    if (status === 'pending') {
      return (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      );
    }
    if (status === 'rejected') {
      return (
        <Section>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <ImageError message={error.message}>{error.message}</ImageError>
          <ToastContainer autoClose={3000} />
        </Section>
      );
    }
    if (status === 'resolved') {
      return (
        <Section>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
          <Container>
            <ImageGallery imagesName={this.state.imagesName} images={images} />
          </Container>
          {images.length < totalHits && <LoadMore onClick={this.btnLoadMore} />}
          <ToastContainer autoClose={3000} />
        </Section>
      );
    }
  }
}
