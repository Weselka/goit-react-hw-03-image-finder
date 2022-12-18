import { Component } from 'react';
import { ImageGalleryItem } from 'components';
import { ImageGalleryList } from './ImageGallery.styled';
import { fetchImages } from '../../services/Images-api';
// import { LoadMore } from '../Button/Button';
import { Button } from '../Button/Button.styled';

export class ImageGallery extends Component {
  state = {
    // hits: null,
    // total: null,
    totalHits: null,
    error: null,
    status: 'idle',
    // query: '',
    page: 1,
    images: [],
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
      });
      // window.scroll(0, 0);
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      // console.log('Changes name images');
      // console.log('prevProps.imagesName', prevProps.imagesName);
      // console.log('this.props.imagesName', this.props.imagesName);

      try {
        this.setState({ status: 'pending' });
        const {
          hits,
          total,
          totalHits,
          // page: currentPage,
        } = await fetchImages(nextName, this.state.page);
        // console.log(data);
        // this.setState({ ...hits, status: 'resolved' });
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

    // const { query, page } = this.state;
    // const 1 = prevProps.imagesName;
    // const nextName = this.props.imagesName;
    // if (prevState.query !== query || prevState.page !== page) {
    //   this.fetchImages(query, page);
    // }
  }

  // fetchImages = async (query, page) => {
  //   try {
  //     this.setState({ status: 'pending' });
  //     const { hits, total, totalHits } = await fetchImages(query, page);
  //     this.setState({ hits, total, totalHits, status: 'resolved' });
  //   } catch (error) {
  //     this.setState({ error, status: 'rejected' });
  //   }
  // }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.setState({
  //     page: 1,
  //   });
  // };
  // handleClick = e => {
  //   e.preventDefault();
  //   this.props.onClick(this.state.page);
  //   this.setState({
  //     page: 1,
  //   });
  // };

  btnLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, totalHits } = this.state;

    if (status === 'idle') {
      return <div>Add name</div>;
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
          <ImageGalleryList>
            <ImageGalleryItem images={images} />
          </ImageGalleryList>
          {images.length < totalHits && (
            <Button onClick={this.btnLoadMore} type="button">
              Load More
            </Button>
          )}
          ;
        </>
      );
    }
  }
}
