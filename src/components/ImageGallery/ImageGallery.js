import { Component } from 'react';
// import { ImageGalleryItem } from 'components';
import { ImageGalleryList } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    hits: null,
    total: null,
    totalHits: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    if (prevName !== nextName) {
      console.log('Changes name images');
      console.log('prevProps.imagesName', prevProps.imagesName);
      console.log('this.props.imagesName', this.props.imagesName);
      this.setState({ loading: true, hits: null });
      fetch(
        'https://pixabay.com/api/?key=30883328-4550d73a5a5d91ad50d778095&q=${eeee}&page=1'
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('error ${nextName}'));
        })
        // .then(hits => console.log);
        .then(hits => this.setState({ ...hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { loading, hits, error } = this.state;
    const { imagesName } = this.props;
    return (
      <ImageGalleryList>
        {error && <h1>{error.message}</h1>}
        {loading && <h1>Download</h1>}
        {!imagesName && <div>Add name</div>}
        {hits && (
          <>
            {hits.map(hit => {
              return (
                <li key={hit.id}>
                  <p>{hit.tags}</p>
                  <img src={hit.webformatURL} alt={hit.tags}></img>
                </li>
              );
            })}
            {/* <ImageGalleryItem images={hits} /> */}
          </>
        )}
      </ImageGalleryList>
    );
  }
}

/*  */
