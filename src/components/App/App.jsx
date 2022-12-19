import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Searchbar, ImageGallery } from 'components';


export class App extends Component {
  state = {
    imagesName: '',
  };

  handleSearchFormSubmit = imagesName => {
    this.setState({ imagesName });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <Container>
          <ImageGallery imagesName={this.state.imagesName} />
        </Container>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
